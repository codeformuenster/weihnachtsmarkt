import Booth from '../../components/List/Booth';
import { connect } from 'react-redux';

export function mapStateToProps({ allMarkets }) {
  return { allMarkets }
}

export function mapDispatchToProps(dispatch) {
  return {
    setAllMarkets: (allMarkets) => dispatch({
      type: `SET_ALL_MARKETS`, payload: allMarkets })
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Booth);
