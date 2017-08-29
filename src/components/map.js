import React, { Component } from 'react';
const MapboxGl = require('mapbox-gl');

class Map extends Component {
  constructor(props) {
    super(props)
    MapboxGl.accessToken = "pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw"
  }

  componentDidMount() {
    const map = new MapboxGl.Map({
      container: this.refs.container,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [12.338, 45.4385],
      zoom: 9
    })
  }

  render() {
    return (
      <div id="maps" ref="container">
      </div>
    )
  }
}

export default Map
