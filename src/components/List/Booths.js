// @format
import React from 'react'
import PropTypes from 'prop-types'

import Booth from './Booth'

class Booths extends React.Component {
  static propTypes = {
    allMarkets: PropTypes.array,
    allBooths: PropTypes.array,
    filterData: PropTypes.array,
  }

  componentDidMount() {}

  render() {
    if (this.props.filterData.length === 0) {
      return this.props.allBooths.map((booth, index) => {
        return (
          <Booth
            key={index}
            id={booth.id}
            market={booth.market}
            name={booth.name}
            tags={booth.tags}
            odd={index % 2 == 0}
            type={booth.type}
          />
        )
      })
    } else {
      return this.props.allBooths.map((booth, index) => {
        if (this.props.filterData.includes(booth.id)) {
          return (
            <Booth
              key={index}
              id={booth.id}
              market={booth.market}
              name={booth.name}
              tags={booth.tags}
              odd={index % 2 == 0}
              type={booth.type}
            />
          )
        } else {
          return null
        }
      })
    }
  }

  showTags = tags => {
    return tags.join(', ')
  }
}

export default Booths
