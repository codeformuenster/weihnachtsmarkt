import React, { Component} from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.MapboxAccessToken

export default class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      latitude: 51.962268,
      longitude: 7.625788,
      zoom: 13
    },
    crashes: this.props.mapData
  }

  componentDidMount() {
    console.log(process.env)
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [this.state.viewport.longitude, this.state.viewport.latitude],
      zoom: this.state.viewport.zoom
    });
    this.map.on('style.load', () => {
      
    })
  }

  render() {
    return (
      <div className='map' style={{height: '100%'}} ref={el => this.mapContainer = el} />
    );
  }
}