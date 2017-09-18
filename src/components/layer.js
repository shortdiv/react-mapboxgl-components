import React, { Component, PropTypes } from 'react'

class Layer extends Component {
  componentDidMount() {
    const { map } = this.context
    const {
      id,
      sourceId,
      type,
      styles,
      before
    } = this.props
    const sourceLayer = this.props.sourceLayer ? this.props.sourceLayer : ""
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
  componentWillReceiveProps(nextProps) {
    if(nextProps.data === this.props.data) {
      //do something/
debugger
    }
  }
  render() {
    return null
  }
}

Layer.contextTypes = {
  map: PropTypes.object
}

export default Layer
