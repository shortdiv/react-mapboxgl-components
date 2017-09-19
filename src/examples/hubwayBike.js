import React, { Component } from 'react'

import BaseMap from '../components/baseMap'
import Source from '../components/source'
import Layer from '../components/layer'

const turf = require('turf')
var data = require('../../data/convertedRoutes.geojson')

class HubwayBike extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [-71.114214, 42.366621],
      zoom: 11,
      bikeRoutes: null,
    }
  }
  getBikeTrips() {
    return new Promise((resolve, reject) => {
      if(!data) {reject('Data was not read')}
      resolve(data)
    })
  }
  componentDidMount() {
    this.getBikeTrips()
      .then((data) => {
          this.setState({
            bikeRoutes: data
          })
      })
  }
  render() {
    const {
      center,
      zoom,
      bikeRoutes
    } = this.state
    return (
      <BaseMap
        mapStyle="mapbox://styles/mapbox/light-v9"
        styles={{
          width: "1000px",
          height: "1000px"
        }}
        center={center}
        zoom={zoom}
      >
        <Source
          id="bikeRoutes"
          type="geojson"
          data={bikeRoutes}
        />
        <Layer
          id="bikeRoutes"
          type="line"
          sourceId="bikeRoutes"
          styles={{
            "paint": {
              "line-color": "red",
              "line-opacity": 0.75,
              "line-width": 5
            }
          }}
        />
      </BaseMap>
    )
  }
}

export default HubwayBike
