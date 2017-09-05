import React, { Component, PropTypes } from 'react'

class Source extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { map } = this.context
    const { id, url } = this.props

    map.addSource(id, {
      type: 'vector',
      url: url
    })
  }
  render() {
    return null
  }
}

Source.contextTypes = {
  map: PropTypes.object
}

export default Source
