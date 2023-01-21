import config from '@lib/config'

export default function apiFetcher(base, options, setData) {
  const url = getApiUrl(base)
  const fetchData = async () => {
    const data = await fetcher(url, options)
    setData(data)
  }
  return fetchData()
}

export const fetcher = async (url, options = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  })
  const data = await response.json()

  return data
}

export const getApiUrl = (path = '') => {
  let parts = [
    config.api.url,
  ]
  parts = (path) ? [...parts,path] : parts

  return parts.join('/')
}
