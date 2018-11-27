import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import PropTypes from 'prop-types'
import { booths, pois } from './../../helpers/client'
import * as turf from '@turf/turf'
import { Link } from 'gatsby'
import ReactDOM from 'react-dom'

import './map.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZmVsaXhhZXRlbSIsImEiOiJjajl5OWRib2c4Y3I3MzN0NG5qb3N4ZDNhIn0.ZSVnG5S1oXz2fXDoboV_RA'
// mapboxgl.accessToken = process.env.MapboxAccessToken

const boothStyling = [
  {
    type: 'beverage',
    color: '#390035',
  },
  {
    type: 'craft',
    color: '#0097df',
  },
  {
    type: 'food',
    color: '#db5f62',
  },
  {
    type: 'clothes',
    color: '#00D1B2',
  },
  {
    type: 'candy',
    color: '#ffde2d',
  },
]

export default class Map extends Component {
  state = {
    viewport: {
      ...this.props.viewport,
    },
  }

  constructor(props) {
    super(props)
    this.addPopup = this.addPopup.bind(this)
  }

  async componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: 'mapbox://styles/mapbox/satellite-v9',
      style: 'mapbox://styles/felixaetem/cjmwkrak403hr2snrjunbuvze',
      center: [this.state.viewport.longitude, this.state.viewport.latitude],
      zoom: this.state.viewport.zoom,
      bearing: this.state.viewport.bearing,
      pitch: this.state.viewport.pitch,
      // attributionControl: false,
    })
    this.map.addControl(new mapboxgl.NavigationControl())
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    )
    this.map.on('style.load', async () => {
      try {
        let marketsFeatures = this.props.allMarkets
        if (this.props.allMarkets.length === 0) {
          await pois.sync()
          const { data } = await pois.list({ filters: { type: 'market' } })
          this.props.setAllMarkets(data)
        }
        this.map.addSource('markets-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: marketsFeatures.map(e => ({
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
          paint: {
            'fill-color': '#747474',
            'fill-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              0.8,
              16,
              0.6,
              18,
              0,
            ],
          },
        })
      } catch (err) {
        // eslint-disable-next-line
        console.log('error', err)
      }

      try {
        let boothsFeatures = this.props.allBooths
        if (this.props.allBooths.length === 0) {
          await booths.sync()
          const { data } = await booths.list()
          this.props.setAllBooths(data)
        }

        this.map.addSource('booths-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: boothsFeatures.map(e => ({
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
          paint: {
            'fill-extrusion-color': [
              'case',
              // if filterVisible == 0
              //color depending on type
              ['==', ['get', 'filterVisible'], 0],
              [
                'match',
                ['get', 'type'],
                'beverage',
                '#390035',
                'craft',
                '#0097df',
                'food',
                '#db5f62',
                'clothes',
                '#00D1B2',
                'candy',
                '#ffde2d',
                /* other */ '#ccc',
              ],
              // else
              //color white
              ['==', ['get', 'filterVisible'], 1],
              '#ffffff',
              // default
              // color white
              '#ffffff',
              // {
              //   property: 'filterVisible',
              //   stops: [[0, '#F60000'], [1, '#00FFFF']],
              // },
            ],
            'fill-extrusion-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              13,
              0,
              16,
              1,
            ],
            'fill-extrusion-height': 3,
            // 'fill-extrusion-opacity': 0.5,
          },
        })
      } catch (err) {
        // eslint-disable-next-line
        console.log('error', err)
      }
    })

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

    this.map.on('zoom', () => {
      this.props.setViewport({
        ...this.state.viewport,
        zoom: this.map.getZoom(),
      })
    })

    this.map.on('move', () => {
      this.props.setViewport({
        ...this.state.viewport,
        latitude: this.map.getCenter().lat,
        longitude: this.map.getCenter().lng,
      })
    })

    this.map.on('pitch', () => {
      this.props.setViewport({
        ...this.state.viewport,
        pitch: this.map.getPitch(),
      })
    })

    this.map.on('rotate', () => {
      this.props.setViewport({
        ...this.state.viewport,
        bearing: this.map.getBearing(),
      })
    })
  }

  addPopup(el, lat, lng) {
    const placeholder = document.createElement('div')
    ReactDOM.render(el, placeholder)

    new mapboxgl.Popup()
      .setDOMContent(placeholder)
      .setLngLat({ lng: lng, lat: lat })
      .addTo(this.map)
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
    if (this.props.filterData.length !== 0 && this.map != null) {
      this.map.getSource('booths-source').setData({
        type: 'FeatureCollection',
        features: this.props.allBooths.map(e => ({
          ...e,
          type: 'Feature',
          properties: {
            ...e,
            filterVisible: this.props.filterData.includes(e.id) ? 1 : 0,
          },
        })),
      })
      this.map.setPaintProperty('booths', 'fill-extrusion-color', [
        'case',
        // if filterVisible == 0
        //color depending on type
        ['==', ['get', 'filterVisible'], 0],
        'grey',
        // [
        //   'match',
        //   ['get', 'type'],
        //   'beverage',
        //   '#bda4bb',
        //   'craft',
        //   '#c8dbe4',
        //   'food',
        //   '#d8babb',
        //   'clothes',
        //   '#aac3c0',
        //   'candy',
        //   '#fdfae8',
        //   /* other */ '#ccc',
        // ],
        // else
        //color white
        ['==', ['get', 'filterVisible'], 1],
        'red',
        // [
        //   'match',
        //   ['get', 'type'],
        //   'beverage',
        //   '#390035',
        //   'craft',
        //   '#0097df',
        //   'food',
        //   '#db5f62',
        //   'clothes',
        //   '#00D1B2',
        //   'candy',
        //   '#ffde2d',
        //   /* other */ '#ccc',
        // ],
        // default
        // color white
        '#ffffff',
        // {
        //   property: 'filterVisible',
        //   stops: [[0, '#F60000'], [1, '#00FFFF']],
        // },
      ])
    } else {
      if (this.map != null) {
        if (this.map.getSource('booths-source') != null) {
          this.map.getSource('booths-source').setData({
            type: 'FeatureCollection',
            features: this.props.allBooths.map(e => ({
              ...e,
              type: 'Feature',
              properties: {
                ...e,
                filterVisible: 0,
              },
            })),
          })
          // set default styling
          this.map.setPaintProperty('booths', 'fill-extrusion-color', [
            'case',
            // if filterVisible == 0
            //color depending on type
            ['==', ['get', 'filterVisible'], 0],
            [
              'match',
              ['get', 'type'],
              'beverage',
              '#390035',
              'craft',
              '#0097df',
              'food',
              '#db5f62',
              'clothes',
              '#00D1B2',
              'candy',
              '#ffde2d',
              /* other */ '#ccc',
            ],
            // else
            //color white
            ['==', ['get', 'filterVisible'], 1],
            '#ffffff',
            // default
            // color white
            '#ffffff',
            // {
            //   property: 'filterVisible',
            //   stops: [[0, '#F60000'], [1, '#00FFFF']],
            // },
          ])
        }
      }
    }
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <div className="welcome-sign">
          <span className="welcome-sign-text">Weihnachtsmärkte in Münster</span>
        </div>
        <div className="map" ref={el => (this.mapContainer = el)} />
        <div className="legend">
          {boothStyling.map((e, i) => (
            <div key={i}>
              <span
                className="legend-color"
                style={{
                  backgroundColor: e.color,
                }}
              />
              <span>{e.type}</span>
            </div>
          ))}
        </div>
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
