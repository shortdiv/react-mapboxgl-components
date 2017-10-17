import React, { Component, PropTypes } from 'react';
const MapboxGl = require('mapbox-gl');

export default class BaseMap extends Component {
  static childContextTypes = {
    map: PropTypes.object
  }
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
    const {
      mapStyle,
      styles,
      center,
      zoom,
    } = this.props
    const map = new MapboxGl.Map({
      container: this.mapbox,
      style: mapStyle,
      center: center,
      zoom: zoom
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
  componentWillUnmount() {
    const { map } = this.state
    if (map) { map.remove() }
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
