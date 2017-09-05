import React, { Component } from 'react';
const MapboxGl = require('mapbox-gl');

class Map extends Component {
  constructor(props) {
    super(props)
    MapboxGl.accessToken = "pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw"
    this.state = {
    }
  }

  componentDidMount() {
    const map = new MapboxGl.Map({
      container: this.mapbox,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [12.338, 45.4385],
      zoom: 9
    })
  }

  render() {
    const { map } = this.state
    return (
      <div id="container"
        ref={ref => this.mapbox = ref}
      >
      </div>
    )
  }
}

export default Map
