import config from '@lib/config'

export default function apiFetcher(url, options, setData) {
  const fetchData = async () => {
    const data = await fetcher(url, options)
    setData(data)
  }
  return fetchData()
}

export const fetcher = async (url, options = {}) => {

  const {
    method='POST',
    type = 'application/json',
    body
  } = options

  let fetchOptions = {
    method,
    redirect: 'follow',
    headers: {
      'Accept': '*/*',
      'Content-Type': type,
    },
  }
  if(method === 'POST' && body) {
    fetchOptions = {
      ...fetchOptions,
      body: JSON.stringify(body),
    }
  }

  const response = await fetch(url, fetchOptions)

  let data
  switch(type) {
    case 'application/json':
      data = await response.json()
      break;
    default:
      data = await response.text()
  }

  return data
}
