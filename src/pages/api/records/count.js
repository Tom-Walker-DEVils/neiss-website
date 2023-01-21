// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { fetchDbCount } from '@lib/db'

export default async function handler(req, res) {
  let count = 0
  try {
    count = await fetchDbCount({
      dbName: 'neiss-random',
      collection: 'records',
    })
  } catch (e) {
    console.error('db', e)
  }

  return res.status(200).json(count)
}
