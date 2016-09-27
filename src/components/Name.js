import Immutable from 'immutable'
import NameChunk from './NameChunk'
import React from 'react'
import ReactDOM from 'react-dom'

export default class Name extends React.Component {
  constructor() {
    super()
    this.componentDidMount = this.componentDidMount.bind(this)
    this._getStyle = this._getStyle.bind(this)
    this.render = this.render.bind(this)
  }
  componentDidMount() {
    this.props.setNameEl(ReactDOM.findDOMNode(this))
  }
  _getStyle() {
    return {
      transform: 'scale(' + this.props.adjustment + ')',
      transformOrigin: this.props.xOffset + 'px 0'
    }
  }
  render() {
    return (
      <div className='name' style={this._getStyle()}>
        <NameChunk handleDrag={this.props.handleNameChunkDrag}
                   nameChunk={this.props.nameChunks.get('n')} /> 
        <NameChunk handleDrag={this.props.handleNameChunkDrag}
                   nameChunk={this.props.nameChunks.get('er1')} />
        <NameChunk handleDrag={this.props.handleNameChunkDrag}
                   nameChunk={this.props.nameChunks.get('v')} />
        <NameChunk handleDrag={this.props.handleNameChunkDrag} 
                   nameChunk={this.props.nameChunks.get('ah0')} />
        <NameChunk handleDrag={this.props.handleNameChunkDrag} 
                   nameChunk={this.props.nameChunks.get('s')} />
      </div>
    )
  }
}
