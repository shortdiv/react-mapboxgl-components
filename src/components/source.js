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
    const { map } = this.context
    if(nextProps.data != this.props.data) {
      map.getSource(this.props.id).setData(nextProps.data)
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
