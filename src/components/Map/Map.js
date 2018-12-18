import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import PropTypes from 'prop-types'
import { booths, pois } from './../../helpers/client'
import * as turf from '@turf/turf'
import { Link } from 'gatsby'
// import ReactDOM from 'react-dom'
import Legend from './Legend/Legend'
import ReactMapGL, { NavigationControl, Popup } from 'react-map-gl'
import {
  boothStyle,
  marketStyle,
  filterBoothStyle,
  defaultBoothColors,
} from './styling'
// import DeckGL, { GeoJsonLayer } from 'deck.gl'

import './map.css'

// mapboxgl.accessToken =
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiZmVsaXhhZXRlbSIsImEiOiJjajl5OWRib2c4Y3I3MzN0NG5qb3N4ZDNhIn0.ZSVnG5S1oXz2fXDoboV_RA'
// mapboxgl.accessToken = process.env.MapboxAccessToken

const MARKET_BOOTH_CLICK_ZOOM_TRESHOLD = 16

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popupInfo: null,
      mapInitialized: false,
    }
    this.renderPopup = this.renderPopup.bind(this)
    this._onLoad = this._onLoad.bind(this)
    this._handleClick = this._handleClick.bind(this)
    this._filterBooths = this._filterBooths.bind(this)
  }

  componentDidMount() {
    this.map = this.themap.getMap()

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: false,
    })

    geolocate.on('geolocate', e => {
      this.props.setViewport({
        latitude: e.coords.latitude,
        longitude: e.coords.longitude,
      })
    })

    this.map.addControl(geolocate)
  }

  componentWillUnmount() {
    this.setState({
      mapInitialized: false,
    })
  }

  async fetchData() {
    if (this.props.allMarkets.length === 0) {
      await pois.sync()
      const { data } = await pois.list({ filters: { type: 'market' } })
      this.props.setAllMarkets(data)
    }

    if (this.props.allBooths.length === 0) {
      await booths.sync()
      const { data } = await booths.list()
      this.props.setAllBooths(data)
    }
  }

  async _onLoad() {
    await this.fetchData()
    // add Markets from POI Collection
    this.map.addSource('markets-source', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: this.props.allMarkets.map(e => ({
          ...e,
          type: 'Feature',
          properties: e,
        })),
      },
    })
    this.map.addLayer({
      id: 'markets',
      type: 'fill',
      source: 'markets-source',
      layout: {},
      maxzoom: 18,
      paint: marketStyle,
    })

    // add Booths from Booth from Booth Collection
    this.map.addSource('booths-source', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: this.props.allBooths.map(e => ({
          ...e,
          type: 'Feature',
          properties: {
            ...e,
            filterVisible: 0,
          },
        })),
      },
    })
    this.map.addLayer({
      id: 'booths',
      type: 'fill-extrusion',
      source: 'booths-source',
      layout: {},
      minzoom: 13,
      paint: boothStyle,
    })

    this.setState({
      mapInitialized: true,
    })
    if (this.props.filterData.length > 0) {
      this._filterBooths(this.props.filterData)
    }
  }

  renderPopup() {
    const { popupInfo } = this.state

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <div
            style={{
              fontWeight: 600,
              marginTop: '1rem',
            }}
          >
            {popupInfo.link ? (
              <Link to={this.createPath(popupInfo.title, popupInfo.id)}>
                {popupInfo.title}
              </Link>
            ) : (
              popupInfo.title
            )}
          </div>
          <p>{popupInfo.description}</p>
        </Popup>
      )
    )
  }

  _handleClick(e) {
    const features = this.map.queryRenderedFeatures(e.point)
    if (features.length > 0) {
      let feature = null
      if (this.props.viewport.zoom <= MARKET_BOOTH_CLICK_ZOOM_TRESHOLD) {
        feature = features.filter(e => e.source === 'markets-source')[0]
        this.props.setSelectedMarket(feature)
      } else {
        feature = features.filter(e => e.source === 'booths-source')[0]
        this.props.setSelectedBooth(feature)
      }

      if (feature == null) {
        this.setState({
          popupInfo: null,
        })
        return
      }

      const coords = turf.centerOfMass(
        turf.polygon(JSON.parse(feature.properties.geometry).coordinates)
      ).geometry.coordinates

      const popupInfo = {
        latitude: coords[1],
        longitude: coords[0],
        title: feature.properties.name || '',
        description: feature.properties.description || '',
        id: feature.properties.id,
        link: feature.source === 'booths-source',
      }
      this.setState({
        popupInfo,
      })
    } else {
      this.setState({
        popupInfo: null,
      })
    }
  }

  _filterBooths(filter) {
    if (filter.length > 0) {
      this.map.getSource('booths-source').setData({
        type: 'FeatureCollection',
        features: this.props.allBooths.map(e => ({
          ...e,
          type: 'Feature',
          properties: {
            ...e,
            filterVisible: filter.includes(e.id) ? 1 : 0,
          },
        })),
      })
      this.map.setPaintProperty(
        'booths',
        'fill-extrusion-color',
        filterBoothStyle
      )
    } else {
      this.map.setPaintProperty(
        'booths',
        'fill-extrusion-color',
        defaultBoothColors
      )
    }
  }

  createPath = (name, id) => {
    let path = '/'
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

  render() {
    if (this.state.mapInitialized) {
      this._filterBooths(this.props.filterData)
    }
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <div className="welcome-sign">
          <span className="welcome-sign-text">Weihnachtsmärkte in Münster</span>
        </div>
        <ReactMapGL
          ref={el => (this.themap = el)}
          {...this.props.viewport}
          width="100%"
          height="100%"
          touchRotate={true}
          onViewportChange={viewport => {
            this.props.setViewport(viewport)
          }}
          onLoad={this._onLoad}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/felixaetem/cjmwkrak403hr2snrjunbuvze"
          onClick={this._handleClick}
        >
          {this.renderPopup()}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '40px',
              margin: '10px',
            }}
          >
            <NavigationControl
              onViewportChange={viewport => this.props.setViewport(viewport)}
            />
          </div>
        </ReactMapGL>
        <Legend />
      </div>
    )
  }
}

Map.propTypes = {
  allBooths: PropTypes.array,
  allMarkets: PropTypes.array,
  viewport: PropTypes.object,
  filterData: PropTypes.array,
  setAllBooths: PropTypes.func,
  setAllMarkets: PropTypes.func,
  setSelectedMarket: PropTypes.func,
  setSelectedBooth: PropTypes.func,
  setViewport: PropTypes.func,
}
