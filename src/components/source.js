import React, { Component, PropTypes } from 'react'

class Source extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { map } = this.context
    const { id, type, url, data } = this.props

    if(url) {
      map.addSource(id, {
        type: type,
        url: url
      })
    } else {
      map.addSource(id, {
        type: type,
        data: data
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data != this.props.data) {
      debugger
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
