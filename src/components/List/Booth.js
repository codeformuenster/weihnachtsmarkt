// @format
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import './Booth.css'

import Logo from './Logo'

class Booth extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    market: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
    type: PropTypes.string,
    odd: PropTypes.bool,
    allMarkets: PropTypes.array,
    setAllMarkets: PropTypes.func,
  }

  componentDidMount() {
    console.log(this.props.allMarkets)
  }

  render() {
    return (
      <Link to={`/details/slug-to-be-inserted-here`}>
        <div className={'booth ' + (this.props.odd ? 'odd' : 'even')}>
          <div className="logo">
            <Logo type={this.props.type} />
          </div>
          <div className="name truncate">{this.props.name}</div>
          <div className="market truncate">{this.props.market}</div>
          <div className="tags truncate">{this.showTags(this.props.tags)}</div>
        </div>
      </Link>
    )
  }

  showTags = tags => {
    return tags.join(', ')
  }
}

export default Booth