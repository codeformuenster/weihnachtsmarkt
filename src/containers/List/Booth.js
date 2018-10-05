import Booth from '../../components/List/Booth';
import { connect } from 'react-redux';
//import { Dispatch } from 'redux';

export function mapStateToProps({ marketData }) {
  return { marketData }
}

export function mapDispatchToProps(dispatch) {
  return {
    setSelectedMarket: (market) => dispatch({
      type: `SET_SELECTED_MARKET`, payload: market })
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Booth);
