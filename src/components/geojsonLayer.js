import React, { Component, PropTypes } from 'react'

class GeojsonLayer extends Component {
  componentDidMount() {
    const { map } = this.context
    const {
      id,
      type,
      data,
      onClick,
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
    map.on('click', id, onClick)
    map.on('mouseenter', id, () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', id, () => {
      map.getCanvas().style.cursor = ''
    })
  }
  componentWillUnmount() {
    map.removeSource(this.props.id)
    map.removeLayer(this.props.id)
  }
  render() {
    return null
  }
}

GeojsonLayer.contextTypes = {
  map: PropTypes.object
}

export default GeojsonLayer
