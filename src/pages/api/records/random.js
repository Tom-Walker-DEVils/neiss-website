// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fetchDb, { fetchDbSample } from '@lib/db'

import config from '@lib/config'

export default async function handler(req, res) {
  const { body } = req
  const { limit = 1 } = body
  const dbName = config.db.name
  const collection = 'records'

  let data = {}
  try {
    data = await fetchDbSample({
      dbName,
      collection,
      limit,
      // projection: {
      //   reason: 'narrative_1',
      // },
    })
  } catch (e) {
    console.error('db', e)
  }

  return res.status(200).json(data)
}
