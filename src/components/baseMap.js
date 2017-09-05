import React, { Component, PropTypes } from 'react';
const MapboxGl = require('mapbox-gl');

class BaseMap extends Component {
  constructor(props) {
    super(props)
    MapboxGl.accessToken = "pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw"
    this.state = {
      map: null
    }
  }

  getChildContext() {
    return {
      map: this.state.map
    }
  }

  componentDidMount() {
    const { mapStyle, center } = this.props
    const map = new MapboxGl.Map({
      container: this.mapbox,
      style: mapStyle,
      center: center,
      zoom: 9
    })
    map.on('load', (...args) => {
      this.setState({
        map
      })
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.children !== this.props.children ||
      nextProps.styles !== this.props.styles ||
      nextState.map !== this.state.map
    )
  }

  render() {
    const { map } = this.state
    const { styles, children } = this.props
    return (
      <div id="container"
        ref={ref => this.mapbox = ref}
        style={styles}
      >
        {map && children}
      </div>
    )
  }
}

BaseMap.childContextTypes = {
  map: PropTypes.object
}


export default BaseMap
