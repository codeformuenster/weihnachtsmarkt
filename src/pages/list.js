// @format
import React from 'react'

import Layout from '../components/layout'
import ConnectedBooths from '../containers/List/Booths'

import './list.css'
import '../components/List/Booth.css'

const ListPage = () => (
  <Layout layout="list">
    <ConnectedBooths />
  </Layout>
)

export default ListPage
