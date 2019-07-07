import NameChunk from './NameChunk'
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { chunkWasDragged, nameElWasSet } from '../store'
import { Chunk, Chunks, NameElWasSet, State } from '../types'


type Props = {
  adjustment: number,
  chunks: Chunks,
  chunkWasDragged: (chunk: Chunk) => void,
  nameElWasSet: (nameEl: HTMLDivElement) => NameElWasSet,
  xOffset: number,
}

const Name = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current !== null) {
      props.nameElWasSet(ref.current)
    }
  }, [ref])
  const chunks = Object.values(props.chunks)
  if (chunks.length === 0) {
    return null
  }
  return (
    <div
      className="name"
      ref={ref}
    >
      {chunks.map((chunk: Chunk | undefined) => {
        if (chunk === undefined) {
          return null
        }
        return (
          <NameChunk
            chunk={chunk}
            handleDrag={props.chunkWasDragged}
            key={chunk.key}
          />
          )
      })}
      <style jsx>{`
        display: block;
        margin: 0 auto 0 auto;
        font-weight: bold;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        position: relative;
        z-index: 2;
        width: 768px;
        height: 768px;
        font-size: 108px;
        transform: scale(${props.adjustment});
        transform-origin: ${props.xOffset}px 0;
      `}</style>
    </div>
  )
}

function mapStateToProps(state: State) {
  return {
    adjustment: state.adjustment,
    chunks: state.chunks,
    xOffset: state.xOffset,
  }
}

export default connect(mapStateToProps, {
  chunkWasDragged,
  nameElWasSet,
})(Name)

// export default class Name extends React.Component {
//   static defaultProps = {
//     nameChunks: Immutable.Map(),
//   }
//   static propTypes = {
//     adjustment: PropTypes.number.isRequired,
//     handleNameChunkDrag: PropTypes.func.isRequired,
//     nameChunks: ImmutablePropTypes.mapOf(ImmutablePropTypes.contains({
//       color: PropTypes.string.isRequired,
//       key: PropTypes.string.isRequired,
//       x: PropTypes.number.isRequired,
//       y: PropTypes.number.isRequired,
//     })),
//     setNameEl: PropTypes.func.isRequired,
//     xOffset: PropTypes.number.isRequired,
//   }
//   constructor() {
//     super()
//     this.componentDidMount = this.componentDidMount.bind(this)
//     this._getStyle = this._getStyle.bind(this)
//     this.render = this.render.bind(this)
//   }
//   componentDidMount() {
//     this.props.setNameEl(this.el)
//   }
//   _getStyle() {
//     return {
//       transform: `scale(${this.props.adjustment})`,
//       transformOrigin: `${this.props.xOffset}px 0`,
//     }
//   }
//   render() {
//     let nameChunks = null
//     if (!this.props.nameChunks.isEmpty()) {
//       nameChunks = this..toArray()
//     }
//     return (
//       <div
//         className="name"
//         style={this._getStyle()}
//         ref={(el) => { this.el = el }}
//       >
//         {nameChunks}
//       </div>
//     )
//   }
// }

