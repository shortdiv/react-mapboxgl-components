import React, { Component, PropTypes } from 'react'

class Source extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { map } = this.context
    const { id, url, data } = this.props

    if(url) {
      map.addSource(id, {
        type: 'vector',
        url: url
      })
    } else {
      map.addSource(id, {
        type: 'vector',
        data: data
      })
    }
  }
  render() {
    return null
  }
}

Source.contextTypes = {
  map: PropTypes.object
}

export default Source
