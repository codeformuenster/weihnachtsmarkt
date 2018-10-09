import React from 'react'

import Layout from '../components/layout'
import Map from '../components/Map/Map'

import { connect } from 'react-redux'

const mapStateToProps = ({ allBooths, allMarkets, viewport, filterData }) => ({
  allBooths,
  allMarkets,
  viewport,
  filterData,
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
const ConnectedMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

const IndexPage = () => {
  return (
    <Layout layout="map">
      <ConnectedMap />
    </Layout>
  )
}

export default IndexPage
