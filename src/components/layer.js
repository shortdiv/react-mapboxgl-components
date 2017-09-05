import React, { Component, PropTypes } from 'react'

class Layer extends Component {
  componentDidMount() {
    const { map } = this.context
    const { id, sourceId, sourceLayer } = this.props
    const sourceSrc = map.getSource(sourceId)
    map.addLayer({
      id: id,
      source: sourceId,
      "source-layer": sourceLayer,
      type: 'line',
      paint: {
        "line-color": "#ad0403",
        "line-width": 2
      }
    })
    debugger;
  }
  render() {
    return null
  }
}

Layer.contextTypes = {
  map: PropTypes.object
}

export default Layer
