import React from 'react'
import Map from '../../components/Map/Map'
import { connect } from 'react-redux'
import { graphql, StaticQuery } from 'gatsby'
import Client from '../../helpers/client'

const StaticQueryMap = props => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            baseUrl
          }
        }
      }
    `}
    render={data => (
      <Map {...props} client={Client(data.site.siteMetadata.baseUrl)} />
    )}
  />
)

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaticQueryMap)
