import Map from '../../components/Map/Map';
import { connect } from 'react-redux';

export function mapStateToProps({ allMarkets, marketData }) {
  return { allMarkets, marketData }
}

export function mapDispatchToProps(dispatch) {
  return {
    setAllMarkets: allMarkets =>
      dispatch({ type: `SET_ALL_MARKETS`, payload: allMarkets }),
    setSelectedMarket: market =>
      dispatch({ type: `SET_SELECTED_MARKET`, payload: market })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
