// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { fetcher } from '@lib/api'

import config from '@lib/config'

export default async function handler(req, res) {
  let data = {}
  try {
    data = await fetcher(config.externalApi.url, {
      method: 'GET',
      type: 'text/html',
    })
  } catch (e) {
    console.error('db', e)
  }

  return res.status(200).json(data)
}
