import Kinto from 'kinto'

const client = new Kinto({
  remote: 'https://kinto-weihnachtsmarkt.codeformuenster.org/v1',
  bucket: 'weihnachtsmarkt',
})

export default {
  booths: client.collection('booths'),
  markets: client.collection('markets'),
}
