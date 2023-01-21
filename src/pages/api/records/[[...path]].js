// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fetchDb from '@lib/db'

export default async function handler(req, res) {
  const { body } = req
  const { query } = req
  const { path } = query

  let data = []
  try {
    data = await fetchDb(body)
  } catch (e) {
    console.error('db', e)
  }

  return res.status(200).json(data)
}
