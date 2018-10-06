import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import PropTypes from 'prop-types'
import { booths, markets } from './../../helpers/client'

import './map.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZmVsaXhhZXRlbSIsImEiOiJjajl5OWRib2c4Y3I3MzN0NG5qb3N4ZDNhIn0.ZSVnG5S1oXz2fXDoboV_RA'
// mapboxgl.accessToken = process.env.MapboxAccessToken

export default class Map extends Component {
  state = {
    viewport: {
      ...this.props.viewport,
    },
  }

  async componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: 'mapbox://styles/mapbox/dark-v9',
      style: 'mapbox://styles/felixaetem/cjmwkrak403hr2snrjunbuvze',
      center: [this.state.viewport.longitude, this.state.viewport.latitude],
      zoom: this.state.viewport.zoom,
      bearing: this.state.viewport.bearing,
      pitch: this.state.viewport.pitch,
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
        let wat = null
        if (this.props.allMarkets.length === 0) {
          await markets.sync()
          wat = await markets.list()
          wat = wat.data
          this.props.setAllMarkets(wat)
        } else {
          wat = this.props.allMarkets
        }
        this.map.addSource('markets-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: wat.map(e => ({
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
              12,
              0.8,
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
        let wat = null
        if (this.props.allBooths.length === 0) {
          await booths.sync()
          wat = await booths.list()
          wat = wat.data
          this.props.setAllBooths(wat)
        } else {
          wat = this.props.allBooths
        }

        this.map.addSource('booths-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: wat.map(e => ({
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
            'fill-extrusion-color': {
              property: 'filterVisible',
              stops: [[0, '#ff0000'], [1, '#00ff00']],
            },
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
      new mapboxgl.Popup()
        .setLngLat(
          JSON.parse(e.features[0].properties.geometry).coordinates[0][0]
        )
        .setHTML(e.features[0].properties.name)
        .addTo(this.map)
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
    } else {
      console.log(this.map)
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
        }
      }
    }
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
