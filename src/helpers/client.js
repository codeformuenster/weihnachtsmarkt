import Kinto from 'kinto'

const client = new Kinto({
  remote: 'https://kinto-weihnachtsmarkt.codeformuenster.org/v1',
  bucket: 'weihnachtsmarkt',
})

export const booths = client.collection('booths')
export const markets = client.collection('markets')
