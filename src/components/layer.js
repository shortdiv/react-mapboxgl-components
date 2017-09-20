import React, { Component, PropTypes } from 'react'
var isEqual = require('lodash.isequal');

class Layer extends Component {
  componentDidMount() {
    const { map } = this.context
    const {
      id,
      sourceId,
      type,
      before
    } = this.props
    const sourceLayer = this.props.sourceLayer ? this.props.sourceLayer : ""
    const paint = this.props.paint ? this.props.paint : {}
    const layout = this.props.layout ? this.props.layout : {}
    const sourceSrc = map.getSource(sourceId)
      debugger
    map.addLayer({
      "id": id,
      "type": type,
      "source": sourceId,
      "source-layer": sourceLayer,
      "paint": paint,
      "layout": layout
    }, before)
  }
  componentWillReceiveProps(nextProps) {
    const { map } = this.context
  }
  render() {
    return null
  }
}

Layer.contextTypes = {
  map: PropTypes.object
}

export default Layer
