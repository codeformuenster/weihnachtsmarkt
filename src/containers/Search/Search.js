import Search from '../../components/search'
import { connect } from 'react-redux'

export const searchDispatchToProps = dispatch => {
  return {
    setFilterData: filterData =>
      dispatch({ type: `SET_FILTER_DATA`, payload: filterData }),
  }
}

export default connect(
  null,
  searchDispatchToProps
)(Search)
