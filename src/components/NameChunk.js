import { DraggableCore } from 'react-draggable'
import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'

export default class NameChunk extends React.Component {
  constructor() {
    super()
    this.state = {
      style: {
        transform: 'translate(0px, 0px)'
      },
      x: 0,
      y: 0
    }
    this._getClassName = this._getClassName.bind(this)
    this._handleDrag = this._handleDrag.bind(this)
    this._setStyle = this._setStyle.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.render = this.render.bind(this)
  }
  _getClassName() {
    return 'name-chunk name-chunk-' + this.props.nameChunk.get('key')
  }
  _handleDrag(event, ui) {
    const el = ReactDOM.findDOMNode(this)
    const draggedNameChunk = {
      key: this.props.nameChunk.get('key'),
      el: el,
      x: this.state.x,
      y: this.state.y,
      deltaX: ui.deltaX,
      deltaY: ui.deltaY
    }
    this.props.handleDrag(draggedNameChunk)
    return true
  }
  _setStyle(props) {
    if (props.nameChunk === undefined) {
      return
    }
    const x = props.nameChunk.get('x')
    const y = props.nameChunk.get('y')
    this.setState({
      style: {
        color: props.nameChunk.get('color'),
        transform: 'translate(' + x + 'px, ' + y + 'px)'
      },
      x: x,
      y: y
    })
  }
  componentWillMount() {
    this._setStyle(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this._setStyle(nextProps)
  }
  render() {
    if (this.props.nameChunk === undefined) {
      return null
    }
    return (
      <DraggableCore onDrag={this._handleDrag}>
        <span className={this._getClassName()} style={this.state.style}>
          {this.props.nameChunk.get('key').toUpperCase()}
        </span>
      </DraggableCore>
    )
  }
}
