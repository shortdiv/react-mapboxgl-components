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
    debugger;
    const { paint } = styles
    const sourceSrc = map.getSource(sourceId)
    map.addLayer({
      id: id,
      source: sourceId,
      "source-layer": sourceLayer,
      type: type,
      paint: styles.paint
    }, before)
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
