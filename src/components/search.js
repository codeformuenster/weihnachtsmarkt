import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './search.css'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://kinto.codeformuenster.org'
    : 'http://localhost:8888'

export default class Search extends Component {
  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          type="search"
          placeholder="Suche nach Ständen, Produkten und Kategorien..."
          autoComplete="off"
          onChange={e => {
            if (e.target.value === '') {
              this.props.setFilterData([])
              return
            }
            fetch(
              `${baseUrl}/v1/buckets/weihnachtsmarkt/collections/booths/search?q=*${
                e.target.value
              }*`
            )
              .then(response => response.json())
              .then(data =>
                this.props.setFilterData(data.hits.hits.map(hit => hit._id))
              )
          }}
        />
      </div>
    )
  }
}

Search.propTypes = {
  setFilterData: PropTypes.func,
}
