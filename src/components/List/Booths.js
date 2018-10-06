// @format
import React from 'react'
import PropTypes from 'prop-types'

import Booth from './Booth'

class Booths extends React.Component {
  static propTypes = {
    allMarkets: PropTypes.array,
    allBooths: PropTypes.array,
  }

  componentDidMount() {}

  render() {
    return this.props.allBooths.map(function(booth, index) {
      return (
        <Booth
          key={index}
          market={booth.market}
          name={booth.name}
          tags={booth.tags}
          odd={index % 2 == 0}
          type={booth.type}
        />
      )
    })
  }

  showTags = tags => {
    return tags.join(', ')
  }
}

export default Booths
