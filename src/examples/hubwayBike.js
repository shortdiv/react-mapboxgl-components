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
      data: data,
      center: [-71.114214, 42.366621],
      zoom: 11,
      bikePos: null,
      bikeRoutes: {
        type: "FeatureCollection",
        features: [{
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: []
          }
        }]
      },
      coords: [],
      ride: null,
      timeStamp: null,
      index: 0,
      raf: 0
    }
  }
  getBikeTrips() {
    return new Promise((resolve, reject) => {
      if(!data) {reject('Data was not read')}
      resolve(data)
    })
  }
  componentDidMount() {
    this.setState({
      timeStamp: performance.now(),
      raf: requestAnimationFrame(this.rideOn.bind(this))
    })
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.state.raf)
  }
  rideOn() {
    let { index, bikeRoutes, timeStamp, raf } = this.state
    let time = performance.now()
    const speed = 60;
    const data = this.state.data.features[0]
    const duration = data.properties.tripDuration
    const path = turf.lineString(data.geometry.coordinates)
    const distance = turf.lineDistance(path, 'miles')

    const currentTime = time - timeStamp
    if(((currentTime * speed) / (duration * 1000)) >= 1) {
      cancelAnimationFrame(this.state.raf)
    } else {
      var currentDistance = (currentTime * speed) / (duration * 1000) * distance;
      var waypoint = turf.along(path, currentDistance, "miles")
      this.setState({
        timeStamp: timeStamp,
        bikePos: waypoint,
        raf: requestAnimationFrame(this.rideOn.bind(this))
      })
    }
  }
  render() {
    const {
      center,
      zoom,
      bikeRoutes,
      bikePos
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
          data={bikePos}
        />
        <Layer
          id="bikeRoutes"
          type="symbol"
          sourceId="bikeRoutes"
          layout={{
            "icon-image": "star-15"
          }}
        />
      </BaseMap>
    )
  }
}

export default HubwayBike
