import React, { Component } from 'react'

import BaseMap from './baseMap'
import Source from './source'
import Layer from './layer'

class MapView extends Component {
  render() {
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
          id="neighborhoods-fill"
          sourceId="neighborhoods"
          sourceLayer="chicago_neighborhoods"
          ref={neighborhoods => this.neighborhoods = neighborhoods}
        />
      </BaseMap>
    )
  }
}

export default MapView
