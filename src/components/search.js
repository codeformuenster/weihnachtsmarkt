import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './search.css'

export default class Search extends Component {
  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          type="search"
          placeholder="Suche nach Ständen, Produkten und Kategorien..."
          onChange={e => {
            // this.props.setFilterData(e.target.value)
            fetch(
              `https://kinto-weihnachtsmarkt.codeformuenster.org/v1/buckets/weihnachtsmarkt/collections/booths/search?q=*${
                e.target.value
              }*`
            )
              .then(response => response.json())
              .then(data => this.props.setFilterData(data))
          }}
        />
      </div>
    )
  }
}

Search.propTypes = {
  setFilterData: PropTypes.func,
}
