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
import { boothStyle, marketStyle } from './styling'
// import DeckGL, { GeoJsonLayer } from 'deck.gl'

import './map.css'

// mapboxgl.accessToken =
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiZmVsaXhhZXRlbSIsImEiOiJjajl5OWRib2c4Y3I3MzN0NG5qb3N4ZDNhIn0.ZSVnG5S1oXz2fXDoboV_RA'
// mapboxgl.accessToken = process.env.MapboxAccessToken

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popupInfo: null,
    }
    this.renderPopup = this.renderPopup.bind(this)
    this._onLoad = this._onLoad.bind(this)
  }

  componentDidMount() {
    this.map = this.themap.getMap()

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    )

    this.map.on('click', 'markets', e => {
      // eslint-disable-next-line
      console.log(e.features)
      this.props.setSelectedMarket(e.features[0])
    })
    this.map.on('click', 'booths', e => {
      // eslint-disable-next-line
      console.log(e.features)
      this.props.setSelectedBooth(e.features[0])
      const Popup = () => {
        return (
          <div>
            <b>{e.features[0].properties.name}</b>
            <br />
            <Link
              to={this.createPath(
                e.features[0].properties.name,
                e.features[0].properties.id
              )}
            >
              Details
            </Link>
          </div>
        )
      }
      const coords = turf.centerOfMass(
        turf.polygon(JSON.parse(e.features[0].properties.geometry).coordinates)
      ).geometry.coordinates
      this.addPopup(<Popup />, coords[1], coords[0])
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

    // const mapStyle = defaultMapStyle
    //   // Add geojson source to map
    //   .setIn(['sources', 'booths-source'], fromJS({ type: 'geojson', data }))
    //   // Add point layer to map
    //   .set('layers', defaultMapStyle.get('layers').push(boothLayer))

    // this.setState({ mapStyle })
  }

  renderPopup() {
    // const placeholder = document.createElement('div')
    // ReactDOM.render(el, placeholder)

    // new mapboxgl.Popup()
    //   .setDOMContent(placeholder)
    //   .setLngLat({ lng: lng, lat: lat })
    //   .addTo(this.map)

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
          <div>You are here</div>
        </Popup>
      )
    )
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
    // console.log(this.props.filterData)
    // this.map = this.themap == undefined ? null : this.themap.getMap()
    // if (this.props.filterData.length !== 0 && this.map != null) {
    //   this.map.getSource('booths-source').setData({
    //     type: 'FeatureCollection',
    //     features: this.props.allBooths.map(e => ({
    //       ...e,
    //       type: 'Feature',
    //       properties: {
    //         ...e,
    //         filterVisible: this.props.filterData.includes(e.id) ? 1 : 0,
    //       },
    //     })),
    //   })
    //   this.map.setPaintProperty('booths', 'fill-extrusion-color', [
    //     'case',
    //     // if filterVisible == 0
    //     //color depending on type
    //     ['==', ['get', 'filterVisible'], 0],
    //     'grey',
    //     // [
    //     //   'match',
    //     //   ['get', 'type'],
    //     //   'beverage',
    //     //   '#bda4bb',
    //     //   'craft',
    //     //   '#c8dbe4',
    //     //   'food',
    //     //   '#d8babb',
    //     //   'clothes',
    //     //   '#aac3c0',
    //     //   'candy',
    //     //   '#fdfae8',
    //     //   /* other */ '#ccc',
    //     // ],
    //     // else
    //     //color white
    //     ['==', ['get', 'filterVisible'], 1],
    //     'red',
    //     // [
    //     //   'match',
    //     //   ['get', 'type'],
    //     //   'beverage',
    //     //   '#390035',
    //     //   'craft',
    //     //   '#0097df',
    //     //   'food',
    //     //   '#db5f62',
    //     //   'clothes',
    //     //   '#00D1B2',
    //     //   'candy',
    //     //   '#ffde2d',
    //     //   /* other */ '#ccc',
    //     // ],
    //     // default
    //     // color white
    //     '#ffffff',
    //     // {
    //     //   property: 'filterVisible',
    //     //   stops: [[0, '#F60000'], [1, '#00FFFF']],
    //     // },
    //   ])
    // } else {
    //   if (this.map != null) {
    //     if (this.map.getSource('booths-source') != null) {
    //       this.map.getSource('booths-source').setData({
    //         type: 'FeatureCollection',
    //         features: this.props.allBooths.map(e => ({
    //           ...e,
    //           type: 'Feature',
    //           properties: {
    //             ...e,
    //             filterVisible: 0,
    //           },
    //         })),
    //       })
    //       // set default styling
    //       this.map.setPaintProperty('booths', 'fill-extrusion-color', [
    //         'case',
    //         // if filterVisible == 0
    //         //color depending on type
    //         ['==', ['get', 'filterVisible'], 0],
    //         [
    //           'match',
    //           ['get', 'type'],
    //           'beverage',
    //           '#390035',
    //           'craft',
    //           '#0097df',
    //           'food',
    //           '#db5f62',
    //           'clothes',
    //           '#00D1B2',
    //           'candy',
    //           '#ffde2d',
    //           /* other */ '#ccc',
    //         ],
    //         // else
    //         //color white
    //         ['==', ['get', 'filterVisible'], 1],
    //         '#ffffff',
    //         // default
    //         // color white
    //         '#ffffff',
    //         // {
    //         //   property: 'filterVisible',
    //         //   stops: [[0, '#F60000'], [1, '#00FFFF']],
    //         // },
    //       ])
    //     }
    //   }
    // }
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
          onViewportChange={viewport => this.props.setViewport(viewport)}
          onLoad={this._onLoad}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/felixaetem/cjmwkrak403hr2snrjunbuvze"
          onClick={e => {
            const popupInfo = {
              latitude: e.lngLat[1],
              longitude: e.lngLat[0],
            }
            this.setState({
              popupInfo,
            })
          }}
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
