import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Details.css'
import Layout from '../components/layout'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    setSelectedBooth: booth =>
      dispatch({ type: `SET_SELECTED_BOOTH`, payload: booth }),
  }
}

class Details extends Component {
  static propTypes = {
    pageContext: PropTypes.object,
    setSelectedBooth: PropTypes.func,
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
      this.props.setSelectedBooth(pageContext)
    }

    if (name === undefined || name === null || name === '') {
      name = 'Leider kein Name :('
    }
    if (image === undefined || image === null) {
      let imagepath = createPath(name)
      try {
        image = require(imagepath)
      } catch (e) {
        image = require('../images/bude.jpg')
      }
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
    if (geometry !== undefined && geometry !== null) {
      let accumulator = [0, 0]
      geometry.coordinates[0].forEach(coordinate => {
        accumulator[0] += coordinate[0]
        accumulator[1] += coordinate[1]
      })
      accumulator[0] /= geometry.coordinates[0].length
      accumulator[1] /= geometry.coordinates[0].length
      geometry = accumulator
    }

    this.state = {
      name: name,
      image: image,
      tags: tags,
      description: description,
      goods: goods,
      center: geometry,
    }
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
              <img className={'details-fit'} src={this.state.image} />
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
              {(this.state.description + '').split('\\n').map(desc => (
                <span key={desc}>
                  {desc}
                  <br />
                </span>
              ))}
            </div>
          </div>
          {this.state.center !== undefined &&
          this.state.center !== null &&
          this.state.center.length == 2 ? (
            <div className={'details-nav-button'}>
              <a
                href={
                  'https://www.google.com/maps/search/?api=1&query=' +
                  this.state.center[1] +
                  ',' +
                  this.state.center[0]
                }
              >
                Bring mich hin
              </a>
            </div>
          ) : (
            ''
          )}
        </div>
      </Layout>
    )
  }
}

function createPath(data) {
  let path = '../images/booths/'
  let slugifiedName = slugify(data)
  if (slugifiedName === null) {
    slugifiedName = data.id
  }
  path = '../images/booths/' + slugifiedName + '.jpg'

  return path
}

function slugify(text) {
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

const ConnectedDetails = connect(
  null,
  mapDispatchToProps
)(Details)

export default ConnectedDetails
