import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Details.css'
import Layout from '../components/layout'

class Details extends Component {
  static propTypes = {
    pageContext: PropTypes.object,
  }

  constructor(props) {
    super(props)
    let { pageContext } = props
    let name = undefined
    let image = undefined
    let tags = undefined
    let description = undefined
    let goods = undefined
    let geometry = undefined
    if (pageContext !== undefined) {
      name = pageContext.name
      tags = pageContext.tags
      description = pageContext.description
      goods = pageContext.goods
      geometry = pageContext.geometry
    }

    if (name === undefined || name === null || name === '') {
      name = 'Leider kein Name :('
    }
    if (image === undefined || image === null) {
      image = 'bude.jpg'
    }
    if (tags === undefined || (tags.length === 1 && tags[0] === 'Ohne')) {
      tags = []
    }
    if (
      description === undefined ||
      description === null ||
      description === '' ||
      description === 'null'
    ) {
      description = 'Leider keine Beschreibung :('
    }
    if (goods === undefined) {
      goods = []
    }

    this.state = {
      name: name,
      image: image,
      tags: tags,
      description: description,
      goods: goods,
      geometry: geometry,
    }

    this.handleEdit = this.handleEdit.bind(this)
  }

  handleEdit() {
    console.log('Changed')
    this.setState({
      ...this.state,
      description: 'Changed',
    })
  }

  render() {
    return (
      <Layout>
        <div>
          <div id={'details-container'}>
            <div className={'details-name details-background'}>
              {this.state.name}
            </div>
            <div className={'details-imagearea'}>
              <img
                className={'details-fit'}
                src={require('../images/' + this.state.image)} // eslint-disable-line no-undef
              />
            </div>
            {this.state.tags.length > 0 ? (
              <div className={'details-tags details-background'}>
                {this.state.tags.map(tag => (
                  <u key={tag} className={'details-tag'}>
                    {tag}
                  </u>
                ))}
              </div>
            ) : (
              ''
            )}
            {this.state.goods.length > 0 ? (
              <div className={'details-goods details-background'}>
                {this.state.goods.map((good, index) => (
                  <span key={good} className={'details-good'}>
                    {good.name}
                    {index < this.state.goods.length - 1 ? ' - ' : ''}
                  </span>
                ))}
              </div>
            ) : (
              ''
            )}
            <div className={'details-description details-background'}>
              {JSON.stringify(this.state.description).replace(
                new RegExp('"', 'g'),
                ''
              )}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Details
