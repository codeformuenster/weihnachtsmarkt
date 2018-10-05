import React from 'react'

import Layout from '../components/layout'
import Map from '../components/Map'
import Search from '../components/search'

import './index.css'

const IndexPage = () => {
  return (
    <Layout>
      <Map />
      <Search />
    </Layout>
  )
}

export default IndexPage
