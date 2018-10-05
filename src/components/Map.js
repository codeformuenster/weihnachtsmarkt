import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './map.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZmVsaXhhZXRlbSIsImEiOiJjajl5OWRib2c4Y3I3MzN0NG5qb3N4ZDNhIn0.ZSVnG5S1oXz2fXDoboV_RA'
// mapboxgl.accessToken = process.env.MapboxAccessToken

export default class Map extends Component {
  state = {
    viewport: {
      latitude: 51.962268,
      longitude: 7.625788,
      zoom: 13,
    },
  }

  componentDidMount() {
    console.log(this.props.marketData)
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [this.state.viewport.longitude, this.state.viewport.latitude],
      zoom: this.state.viewport.zoom,
      attributionControl: false,
    })
    this.map.addControl(new mapboxgl.NavigationControl())
    this.map.on('style.load', () => {
      fetch(
        'https://kinto-weihnachtsmarkt.codeformuenster.org/v1/buckets/weihnachtsmarkt/collections/markets/records'
      )
        .then(response => response.json())
        .then(data => {
          // console.log(data.data[0])
          this.map.addLayer({
            id: 'markets',
            type: 'fill',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                ...data.data[0],
              },
            },
            layout: {},
            maxzoom: 16,
            paint: {
              'fill-color': '#088',
              'fill-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                10,
                0.8,
                16,
                0,
              ],
            },
          })
        })

      fetch(
        'https://kinto-weihnachtsmarkt.codeformuenster.org/v1/buckets/weihnachtsmarkt/collections/booths/records'
      )
        .then(response => response.json())
        .then(data => {
          // console.log(data.data[0])
          this.map.addLayer({
            id: 'booths',
            type: 'fill',
            source: {
              type: 'geojson',
              data: {
                ...data.data[0],
                type: 'Feature',
              },
            },
            layout: {},
            minzoom: 13,
            paint: {
              'fill-color': '#ff0000',
              'fill-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                13,
                0,
                16,
                1,
              ],
            },
          })
        })
    })

    this.map.on('click', 'markets', e => {
      // eslint-disable-next-line
      console.log(e.features)
      this.props.setSelectedMarket(e.features[0])
    })

    this.map.on('click', 'booths', e => {
      // eslint-disable-next-line
      console.log(e.features)
    })
  }

  render() {
    return (
      <div
        className="map"
        style={{ height: '100%' }}
        ref={el => (this.mapContainer = el)}
      />
    )
  }
}

Map.propTypes = {
  marketData: PropTypes.object,
  setSelectedMarket: PropTypes.func,
}
