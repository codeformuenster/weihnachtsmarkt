// @format
import React from 'react'
import PropTypes from 'prop-types'

class Booth extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    market: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
    odd: PropTypes.bool,
  }

  render() {
    if (!this.props.name) {
      throw new Error('Your booth should have a name')
    }

    return (
      <div className={'booth ' + (this.props.odd ? 'odd' : 'even')}>
        <div className="logo ">
          <i className="material-icons">map</i>
        </div>
        <div className="name truncate">{this.props.name}</div>
        <div className="market truncate">{this.props.market}</div>
        <div className="tags truncate">{this.showTags(this.props.tags)}</div>
      </div>
    )
  }

  showTags = tags => {
    return tags.join(', ')
  }
}

export default Booth
