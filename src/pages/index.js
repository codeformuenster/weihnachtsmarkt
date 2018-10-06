import React from 'react'

import Layout from '../components/layout'
import Map from '../components/Map/Map'
import Search from '../components/search'

import './index.css'
import { connect } from 'react-redux'

const mapStateToProps = ({ allBooths, allMarkets, viewport }) => ({
  allBooths,
  allMarkets,
  viewport,
})
const mapDispatchToProps = dispatch => {
  return {
    setAllBooths: markets =>
      dispatch({ type: 'SET_ALL_BOOTHS', payload: markets }),
    setAllMarkets: markets =>
      dispatch({ type: 'SET_ALL_MARKETS', payload: markets }),
    setSelectedMarket: market =>
      dispatch({ type: `SET_SELECTED_MARKET`, payload: market }),
    setSelectedBooth: booth =>
      dispatch({ type: `SET_SELECTED_BOOTH`, payload: booth }),
    setViewport: viewport =>
      dispatch({ type: `SET_VIEWPORT`, payload: viewport }),
  }
}
const searchDispatchToProps = dispatch => {
  return {
    setFilterData: filterData =>
      dispatch({ type: `SET_FILTER_DATA`, payload: filterData }),
  }
}
const ConnectedMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
const ConnectedSearch = connect(
  null,
  searchDispatchToProps
)(Search)

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
        <ConnectedSearch />
      </div>
    </Layout>
  )
}

export default IndexPage
