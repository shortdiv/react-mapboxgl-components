import React, { Component } from 'react'

import BaseMap from './baseMap'
import Source from './source'
import Layer from './layer'
import GeojsonLayer from './geojsonLayer'

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
          id="bikes"
          type="symbol"
          data={{
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-87.62408432, 41.8810317]
              },
              "properties": {
                "icon": "bicycle"
              }
            }]
          }}
          styles={{
            "layout": {
              "icon-image": "{icon}-15",
            }
          }}
        />
      </BaseMap>
    )
  }
}

export default MapView
