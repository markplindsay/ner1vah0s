import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import NameChunk from './NameChunk'
import PropTypes from 'prop-types'
import React from 'react'

export default class Name extends React.Component {
  static defaultProps = {
    nameChunks: Immutable.Map(),
  }
  static propTypes = {
    adjustment: PropTypes.number.isRequired,
    handleNameChunkDrag: PropTypes.func.isRequired,
    nameChunks: ImmutablePropTypes.mapOf(ImmutablePropTypes.contains({
      color: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })),
    setNameEl: PropTypes.func.isRequired,
    xOffset: PropTypes.number.isRequired,
  }
  constructor() {
    super()
    this.componentDidMount = this.componentDidMount.bind(this)
    this._getStyle = this._getStyle.bind(this)
    this.render = this.render.bind(this)
  }
  componentDidMount() {
    this.props.setNameEl(this.el)
  }
  _getStyle() {
    return {
      transform: `scale(${this.props.adjustment})`,
      transformOrigin: `${this.props.xOffset}px 0`,
    }
  }
  render() {
    let nameChunks = null
    if (!this.props.nameChunks.isEmpty()) {
      nameChunks = this.props.nameChunks.map(nameChunk => (
        <NameChunk
          handleDrag={this.props.handleNameChunkDrag}
          key={nameChunk.get('key')}
          nameChunk={nameChunk}
        />
      )).toArray()
    }
    return (
      <div
        className="name"
        style={this._getStyle()}
        ref={(el) => { this.el = el }}
      >
        {nameChunks}
      </div>
    )
  }
}
