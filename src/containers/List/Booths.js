import Booths from '../../components/List/Booths'
import { connect } from 'react-redux'

export function mapStateToProps({ allMarkets, allBooths, filterData }) {
  return { allMarkets, allBooths, filterData }
}

export function mapDispatchToProps(dispatch) {
  return {
    setAllMarkets: allMarkets =>
      dispatch({
        type: `SET_ALL_MARKETS`,
        payload: allMarkets,
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Booths)
