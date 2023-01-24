// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { fetcher } from '@lib/api'

import config from '@lib/config'

export default async function handler(req, res) {
  const { query } = req
  const { count = 1 } = query

  let data = []
  try {
    data = await fetcher(`${config.externalApi.url}?count=${count}`, {
      method: 'GET',
      type: 'text/html',
    })
    if(count > 1) {
      data = JSON.parse(data)
    } else {
      data = [data]
    }
  } catch (e) {
    console.error('db', e)
  }

  return res.status(200).json({
    results: data,
    count: parseInt(data.length, 10),
  })
}
