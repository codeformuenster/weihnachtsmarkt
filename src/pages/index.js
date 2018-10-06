import React from 'react'

import Layout from '../components/layout'
import ConnectedMap from '../containers/Map/Map'
import ConnectedBooths from '../containers/List/Booths'
import Tabs from '../components/tabs'

import './index.css'

const IndexPage = () => (
  <Layout>
    <Tabs>
      <div label="map">
        <ConnectedMap label="map" />
      </div>
      <div className="booths" label="list">
        <ConnectedBooths />
      </div>
    </Tabs>
  </Layout>
)

export default IndexPage
