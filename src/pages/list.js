// @format
import React from 'react'

import Layout from '../components/layout'
import ConnectedBooths from '../containers/List/Booths'
import Search from '../components/search'
import { connect } from 'react-redux'

import './list.css'
import '../components/List/Booth.css'

const listStateToProps = ({ allBooths, allMarkets }) => ({
  allBooths,
  allMarkets,
})
const ConnectedList = connect(
  listStateToProps,
  null
)(ConnectedBooths)

const ListPage = () => (
  <Layout>
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        backgroundColor: '#343332',
      }}
    >
      <Search />
    </div>
    <div className="booths">
      <ConnectedList />
    </div>
  </Layout>
)

export default ListPage
