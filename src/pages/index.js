import React from 'react'

import Layout from '../components/layout'
import ConnectedMap from '../containers/Map/Map'

const IndexPage = () => {
  return (
    <Layout layout="map">
      <ConnectedMap />
    </Layout>
  )
}

export default IndexPage
