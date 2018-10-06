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
            if (e.target.value === '') {
              this.props.setFilterData([])
              return
            }
            fetch(
              `https://kinto-weihnachtsmarkt.codeformuenster.org/v1/buckets/weihnachtsmarkt/collections/booths/search?q=*${
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
