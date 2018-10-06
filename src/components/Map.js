import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import PropTypes from 'prop-types'
import { booths, markets } from './../helpers/client'

import './map.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZmVsaXhhZXRlbSIsImEiOiJjajl5OWRib2c4Y3I3MzN0NG5qb3N4ZDNhIn0.ZSVnG5S1oXz2fXDoboV_RA'
// mapboxgl.accessToken = process.env.MapboxAccessToken

export default class Map extends Component {
  state = {
    viewport: {
      latitude: 51.962268,
      longitude: 7.625788,
      zoom: 15,
    },
  }

  async componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: 'mapbox://styles/mapbox/dark-v9',
      style: 'mapbox://styles/felixaetem/cjmwkrak403hr2snrjunbuvze',
      center: [this.state.viewport.longitude, this.state.viewport.latitude],
      zoom: this.state.viewport.zoom,
      attributionControl: false,
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
        await markets.sync()
        const wat = await markets.list()
        this.map.addSource('markets-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: wat.data.map(e => ({
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
      } catch (err) {
        // eslint-disable-next-line
        console.log('error', err)
      }

      try {
        await booths.sync()
        const wat = await booths.list()
        this.map.addSource('booths-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: wat.data.map(e => ({
              ...e,
              type: 'Feature',
              properties: e,
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
            'fill-extrusion-color': '#ff0000',
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
  setSelectedBooth: PropTypes.func,
}
