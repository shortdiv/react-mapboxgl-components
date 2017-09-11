import React, { Component, PropTypes } from 'react'

class Layer extends Component {
  componentDidMount() {
    const { map } = this.context
    const {
      id,
      sourceId,
      sourceLayer,
      type,
      styles,
      before
    } = this.props
    const { paint } = styles
    const sourceSrc = map.getSource(sourceId)
    map.addLayer({
      id: id,
      type: type,
      source: sourceId,
      "source-layer": sourceLayer,
      paint: styles.paint
    }, before)
  }
  render() {
    return null
  }
}

Layer.contextTypes = {
  map: PropTypes.object
}

export default Layer
