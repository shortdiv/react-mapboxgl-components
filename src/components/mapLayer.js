import React, { Component } from 'react';
const MapboxGl = require('mapbox-gl');

class MapLayer extends Component {
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
    const { width, height } = this.props
    const styles = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: width,
      height: height
    }
    return (
      <div id="container"
        ref={ref => this.mapbox = ref}
        style={styles}
      >
      </div>
    )
  }
}

export default MapLayer
