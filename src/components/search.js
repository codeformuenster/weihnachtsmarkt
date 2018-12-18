import React from 'react'
import PropTypes from 'prop-types'
import './search.css'
import { StaticQuery, graphql } from 'gatsby'

const Search = ({ searchTerm, setFilterData, setSearchTerm }) => (
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
      <div className="search-container">
        <input
          className="search-input"
          type="search"
          placeholder="Suche nach Ständen, Produkten und Kategorien..."
          autoComplete="off"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value)
            let emptyRegEx = /^\s+$/
            if (emptyRegEx.test(e.target.value) || e.target.value === '') {
              setFilterData([])
              return
            }
            fetch(
              `${
                data.site.siteMetadata.baseUrl
              }/v1/buckets/weihnachtsmarkt/collections/booths/search?q=*${
                e.target.value
              }*`
            )
              .then(response => response.json())
              .then(data => setFilterData(data.hits.hits.map(hit => hit._id)))
          }}
        />
      </div>
    )}
  />
)

export default Search

Search.propTypes = {
  searchTerm: PropTypes.string,
  setFilterData: PropTypes.func,
  setSearchTerm: PropTypes.func,
}
