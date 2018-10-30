import Search from '../../components/search'
import { connect } from 'react-redux'

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

export default ConnectedSearch
