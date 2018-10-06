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
    if (pageContext !== undefined) {
      name = pageContext.name
      tags = pageContext.tags
      description = pageContext.description
      goods = pageContext.goods
    }

    if (name === undefined) {
      name = 'Lade'
    }
    if (image === undefined) {
      image = 'bude.jpg'
    }
    if (tags === undefined) {
      tags = []
    }
    if (description === undefined) {
      description = 'Lade'
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
    }
  }

  componentDidMount() {}

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
            <div className={'details-tags details-background'}>
              {this.state.tags.map(tag => (
                <u key={tag} className={'details-tag'}>
                  {tag}
                </u>
              ))}
            </div>
            <div className={'details-goods details-background'}>
              {this.state.goods.map(good => (
                <div key={good} className={'details-good'}>
                  {good.name}
                </div>
              ))}
            </div>
            <div className={'details-description details-background'}>
              {JSON.stringify(this.state.description)}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Details
