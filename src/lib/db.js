import clientPromise from '@lib/mongodb'

import config from '@lib/config'

export default async function fetchDb({
  dbName = config.db.name,
  collection = config.db.collection,
  query = {},
  sort = {},
  index = false,
  limit = 1,
  page = 1,
} = {}) {
  const client = await clientPromise
  const db = client.db(dbName)
  const dbCollection = db.collection(collection)

  if (index) {
    await dbCollection.createIndex(index)
  }
  query = {
    ...query,
    allowDiskUse: true,
  }
  const count = await dbCollection.countDocuments(query);
  const data = await dbCollection.find(query)


  if (sort) {
    data.sort(sort)
  }

  if (limit) {
    if((page - 1) > 0) {
      data.skip((page - 1) * limit)
    }
    data.limit(limit)
  }

  const results = await data.toArray()

  return {
    count,
    results,
  }
}

export async function fetchDbCount({
  dbName = config.db.name,
  collection = config.db.collection,
}) {
  const client = await clientPromise
  const db = client.db(dbName)
  const dbCollection = db.collection(collection)

  const count = await dbCollection.countDocuments({})

  return count
}

export async function fetchDbSample({
  dbName = config.db.name,
  collection = config.db.collection,
  limit = 1,
  projection,
}) {
  const client = await clientPromise
  const db = client.db(dbName)
  const dbCollection = db.collection(collection)

  const data = dbCollection.aggregate([
    {
      $sample: {
        size: limit,
      },
    },
    // ...(projection ? { $project: projection } : {}),
  ])

  const results = await data.toArray()

  return {
    count: limit,
    results,
  }
}
