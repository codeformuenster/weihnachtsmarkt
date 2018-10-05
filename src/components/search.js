import React, { Component } from 'react'
import './search.css'

export default class Search extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          type="search"
          placeholder="Suche nach Ständen, Produkten und Kategorien..."
        />
      </div>
    )
  }
}
