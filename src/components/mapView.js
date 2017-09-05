import React, { Component } from 'react'

import MapLayer from './mapLayer'

class MapView extends Component {
  render() {
    return (
      <MapLayer
        width={1000}
        height={1000}
      />
    )
  }
}

export default MapView
