import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

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
    console.log(process.env)
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [this.state.viewport.longitude, this.state.viewport.latitude],
      zoom: this.state.viewport.zoom,
    })
    this.map.on('style.load', () => {})
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
