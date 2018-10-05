import React from 'react'

import Layout from '../components/layout'
import Map from '../components/Map'
import Search from '../components/search'

import './index.css'

const IndexPage = () => {
  return (
    <Layout>
      <Map />
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '0',
          right: '0',
        }}
      >
        <Search />
      </div>
    </Layout>
  )
}

export default IndexPage
