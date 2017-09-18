import React, { Component } from 'react'

import BaseMap from '../components/baseMap'
import Source from '../components/source'
import Layer from '../components/layer'

const MapboxClient = require('mapbox/lib/services/directions');

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
    return fetch('https://gist.githubusercontent.com/shortdiv/4c66a2571479303cfddf6da9dedc1f9d/raw/567919335e59bee6501e70702cd4aa94d987d4f6/HubwayBikeLife_1701-detailed.geojson')
      .then((res) => {return res.json()})
      .then((trips) => {
        return new Promise((resolve, reject) => {
          if(!trips) { reject('Data was not fetched') }
          resolve(trips)
        })
      })
  }
  getDirections(routes) {
    var mbClient = new MapboxClient('pk.eyJ1Ijoic2hvcnRkaXYiLCJhIjoiY2l3OGc5YmE5MDJzZjJ5bWhkdDZieGdzcSJ9.1z-swTWtcCHYI_RawDJCEw');
      let promises = []
      const api_limit = 108
      for(let i=0; i<api_limit;i++) {
        promises.push(
          mbClient.getDirections([
            {latitude: routes[i].geometry.coordinates[0][1], longitude: routes[i].geometry.coordinates[0][0]},
            {latitude: routes[i].geometry.coordinates[1][1], longitude: routes[i].geometry.coordinates[1][0]}
          ], {
            profile: 'cycling',
            alternatives: false,
            geometry: 'polyline'
          }, (err, results) => {
            return results;
          }).then((results) => {
            return results.entity
          })
        )
      }
      return Promise.all(promises)
  }
  getData() {
    const trips = this.getBikeTrips()
    const routes = trips.then((trips) => { return this.getDirections(trips.features)})
    return Promise.all([trips, routes])
      .then(([tripData, routeData]) => {
        let features = []
        routeData.map((route, index) => {
          if(route.routes) {
            const geom = route.routes[0].geometry
            const properties = tripData.features[index].properties
            features.push({
              "type": "Feature",
              "geometry": geom,
              "properties": properties
            })
          }
        })
        return features
      })
  }
  componentDidMount() {
    this.getData()
      .then((data) => {
        const feat = {
          "type": "FeatureCollection",
          "features": data
        }
        this.setState({
          bikeRoutes: feat
        })
      })
//this.getDirections()
//    this.getBikeTrips()
//      .then((trips) => {
//        trips = trips.features
//        this.getDirections(trips)
//          .then((routes) => {
//debugger
//            let features = []
//            routes.map((route, index) => {
//debugger
//              const geom = route.routes[0].geometry
//              features.push({
//                "type": "Feature",
//                "geometry": geom
//              })
//            })
//            const feat = {
//              "type": "FeatureCollection",
//              "features": features
//            }
//            this.setState({
//              bikeRoutes: feat
//            })
//          })
//      })
  }
  animateRoute(route, destination) {
    //

// set animation speed at 60x real time
// var speed = 60;
// var duration = route.duration;
// var path = turf.linestring(route.geometry.coordinates);
// var distance = turf.lineDistance(path);
// // get starting time of the animation
// var start = performance.now();
//function animate(timestamp) {
// var current_time = timestamp - start;
// // if the animation has reached its destination,
// // move the courier to the destination and end the animation loop
// if ((current_time * speed) / (duration * 1000) >= 1) {
// map.getSource('courier').setData(destination)
// } else {
// // find the current distance the courier has traveled along the path
// var current_distance = current_time * speed) / (duration * 1000) * distance;
// var waypoint = turf.along(path, current_distance, "kilometers");
// map.getSource('courier').setData(waypoint);
// // continue the animation loop
// requestAnimationFrame(animate);
// }
// }
// animate(start);
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
