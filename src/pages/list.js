// @format
import React from 'react'

import Layout from '../components/layout'
import ConnectedBooths from '../containers/List/Booths'
import Search from '../components/search'
import { connect } from 'react-redux'

import './list.css'
import '../components/List/Booth.css'

const searchDispatchToProps = dispatch => {
  return {
    setFilterData: filterData =>
      dispatch({ type: `SET_FILTER_DATA`, payload: filterData }),
  }
}
const ConnectedSearch = connect(
  null,
  searchDispatchToProps
)(Search)

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
      <ConnectedSearch />
    </div>
    <div className="booths">
      <ConnectedBooths />
    </div>
  </Layout>
)

export default ListPage
