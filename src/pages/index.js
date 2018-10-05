import React from 'react'

import Layout from '../components/layout'
import Map from '../components/Map'
import Search from '../components/search'

import './index.css'
import { connect } from 'react-redux'

const mapStateToProps = ({ marketData }) => {
  return { marketData }
}
const mapDispatchToProps = dispatch => {
  return {
    setSelectedMarket: market =>
      dispatch({ type: `SET_SELECTED_MARKET`, payload: market }),
  }
}
const ConnectedMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

const IndexPage = () => {
  return (
    <Layout>
      <ConnectedMap />
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
