import Search from '../../components/search'
import { connect } from 'react-redux'

export function searchStateToProps({ searchTerm }) {
  return { searchTerm }
}

const searchDispatchToProps = dispatch => {
  return {
    setFilterData: filterData =>
      dispatch({ type: `SET_FILTER_DATA`, payload: filterData }),
    setSearchTerm: searchTerm =>
      dispatch({ type: `SET_SEARCH_TERM`, payload: searchTerm }),
  }
}

const ConnectedSearch = connect(
  searchStateToProps,
  searchDispatchToProps
)(Search)

export default ConnectedSearch
