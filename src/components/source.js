import React, { Component, PropTypes } from 'react'

export default class Source extends Component {
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.object
  }
  static contextTypes = {
    map: PropTypes.object
  }
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
  componentWillUnmount() {
    const { map } = this.context
    const { id } = this.props
    map.removeSource(id)
  }
  render() {
    return null
  }
}
