// @format
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import './Booth.css'

import Logo from './Logo'

class Booth extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    market: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
    type: PropTypes.string,
    odd: PropTypes.bool,
  }

  componentDidMount() {}

  render() {
    return (
      <Link to={this.createPath(this.props.name, this.props.id)}>
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

  createPath = (name, id) => {
    let path = '/list'
    if (name) {
      let slugifiedName = this.slugify(name)
      if (slugifiedName === null) {
        if (id) {
          slugifiedName = id
        }
      }
      path = '/details/' + slugifiedName
    }

    return path
  }

  slugify = text => {
    if (text === undefined || text === null) {
      return null
    }

    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }
}

export default Booth
