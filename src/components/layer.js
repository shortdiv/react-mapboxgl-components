import React, { Component, PropTypes } from 'react'

export default class Layer extends Component {
  static propTypes = {
    id: PropTypes.string,
    sourceId: PropTypes.string,
    type: PropTypes.string,
    sourceLayer: PropTypes.string,
    paint: PropTypes.object,
    layout: PropTypes.object
  }
  static contextTypes = {
    map: PropTypes.object
  }
  componentDidMount() {
    const { map } = this.context
    const {
      id,
      sourceId,
      type,
    } = this.props
    const sourceLayer = this.props.sourceLayer ? this.props.sourceLayer : ""
    const paint = this.props.paint ? this.props.paint : {}
    const layout = this.props.layout ? this.props.layout : {}
    const sourceSrc = map.getSource(sourceId)
    map.addLayer({
      "id": id,
      "type": type,
      "source": sourceId,
      "source-layer": sourceLayer,
      "paint": paint,
      "layout": layout
    })
  }
  componentWillReceiveProps(nextProps) {
    const { map } = this.context
  }
  componentWillUnmount() {
    const { map } = this.context
    const { id } = this.props
    map.removeLayer(id)
  }
  render() {
    return null
  }
}
