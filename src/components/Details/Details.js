import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Details.css'

class Details extends Component {
  static propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
    description: PropTypes.string,
  }

  render() {
    let { name, image, tags, description } = this.props

    if (name === undefined) {
      name = 'Titel fehlt noch'
    }
    if (image === undefined) {
      image = 'bude.jpg'
    }
    if (tags === undefined) {
      tags = []
    }
    if (description === undefined) {
      description = 'Beschreibung fehlt noch'
    }

    return (
      <div>
        <div id={'details-container'}>
          <div className={'details-name details-background'}>{name}</div>
          <div className={'details-imagearea'}>
            <img
              className={'details-fit'}
              src={require('../../images/' + image)} // eslint-disable-line no-undef
            />
          </div>
          <div className={'details-tags details-background'}>
            {tags.map(tag => (
              <u key={tag} className={'details-tag'}>
                {tag}
              </u>
            ))}
          </div>
          <div className={'details-description details-background'}>
            {description}
          </div>
        </div>
      </div>
    )
  }
}

export default Details
