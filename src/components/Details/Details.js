import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Details.css'

class Details extends Component {
  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
    description: PropTypes.string,
  }

  render() {
    let { title, image, tags, description } = this.props

    if (title === undefined) {
      title = 'Titel fehlt noch'
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
        <header className={'header'}>
          <h2>There will be a header</h2>
        </header>
        <div id={'container'}>
          <div className={'title'}>{title}</div>
          <div className={'imagearea'}>
            <div className={'img'}>
              <img
                src={require('../../images/' + image)} // eslint-disable-line no-undef
              />
            </div>
          </div>
          <div className={'tags'}>
            {tags.map(tag => (
              <u key={tag} className={'tag'}>
                {tag}
              </u>
            ))}
          </div>
          <div className={'description'}>{description}</div>
        </div>
        <footer className={'searchbar'}>
          <h3>There might be a searchbar</h3>
        </footer>
      </div>
    )
  }
}

export default Details
