const config = {
  api: {
    url: process.env.NEXT_PUBLIC_API_URL,
  },
  db: {
    name: 'neiss-random',
    collection: 'records',
  },
  random: {
    limit: 20,
  }
}

export default config
