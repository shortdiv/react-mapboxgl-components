import React, { Component, PropTypes } from 'react'

class GeojsonLayer extends Component {
  componentDidMount() {
    const { map } = this.context
    const {
      id,
      type,
      data,
      styles
    } = this.props
    const { paint, layout } = styles

    map.addSource(id, {
      "type": 'geojson',
      "data": {
        "type": "FeatureCollection",
        "features": data
      }
    })

    map.addLayer({
      id: id,
      type: type,
      source: id,
      layout: layout
    })
  }
  render() {
    return null
  }
}

GeojsonLayer.contextTypes = {
  map: PropTypes.object
}

export default GeojsonLayer
