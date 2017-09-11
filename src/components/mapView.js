import React, { Component } from 'react'

import BaseMap from './baseMap'
import Source from './source'
import Layer from './layer'
import GeojsonLayer from './geojsonLayer'

const yelp = require('yelp-fusion');
const fetchJsonp = require('fetch-jsonp');

class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cafes: []
    }
  }
  componentDidMount() {
    this.shops().then((res) => {
      this.setState({
        cafes: this.makeGeoJSON(res)
      })
    })
  }
  shops() {
    return new Promise((resolve, reject) => {
      let url = "http://0.0.0.0:8000/yelpit/starbucks/chicago,il"
      fetch(url)
        .then((res) => {
          resolve(res.json())
        })
    })
  }

  makeGeoJSON(input) {
    let data = []
    input.map((t) => {
      var feat = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [t.coordinates.longitude, t.coordinates.latitude]
        },
        "properties": {
          "title": t.name,
          "address": t.location.display_address,
          "rating": t.rating,
          "image": t.image_url,
          "icon": "cafe"
        }
      }
      data.push(feat)
    })
    return data
  }
  render() {
    let { cafes } = this.state
    return (
      <BaseMap
        mapStyle="mapbox://styles/mapbox/light-v9"
        styles={{
          width: "1000px",
          height: "1000px"
        }}
        center={[-87.623177, 41.881832]}
      >
        <Source
          id="neighborhoods"
          url="mapbox://shortdiv.cj4u72j500fu72qplj0xcusp3-738n8"
        />
        <Layer
          id="neighborhoods-border"
          type="line"
          sourceId="neighborhoods"
          sourceLayer="chicago_neighborhoods"
          styles={{
            "paint": {
              "line-color": "#877b59",
              "line-width": 1
            }
          }}
        />
        <GeojsonLayer
          id="cafe"
          type="symbol"
          data={cafes}
          styles={{
            "layout": {
              "icon-image": "cafe-15",
            }
          }}
        />
      </BaseMap>
    )
  }
}

export default MapView
