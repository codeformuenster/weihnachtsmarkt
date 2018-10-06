// @format
import React from 'react'
import PropTypes from 'prop-types'

import Booth from './Booth'

class Booths extends React.Component {
  static propTypes = {
    allMarkets: PropTypes.array,
    setAllMarkets: PropTypes.func,
  }

  componentDidMount() {}

  render() {
    return this.props.allMarkets.map(function(booth, index) {
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
  }

  showTags = tags => {
    return tags.join(', ')
  }
}

export default Booths
