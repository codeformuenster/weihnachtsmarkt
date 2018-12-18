import Kinto from 'kinto'

const Client = baseUrl => {
  const client = new Kinto({
    remote: `${baseUrl}/v1`,
    bucket: 'weihnachtsmarkt',
  })

  const booths = client.collection('booths')
  const pois = client.collection('pois')
  return { booths, pois }
}

export default Client
