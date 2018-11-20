import Kinto from 'kinto'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://kinto-weihnachtsmarkt.codeformuenster.org'
    : 'http://localhost:8888'

const client = new Kinto({
  remote: `${baseUrl}/v1`,
  bucket: 'weihnachtsmarkt',
})

export const booths = client.collection('booths')
export const pois = client.collection('pois')
