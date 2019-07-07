import NameChunk from './NameChunk'
import React, { useEffect, useReducer, useRef } from 'react'
import io from 'socket.io-client'
import {
  Actions,
  Chunk,
  Chunks,
  ChunkWasDragged,
  DraggedChunk,
  State,
  WindowWasResized,
} from '../types'
import { getBoundX, getBoundY, getRandomColor } from '../utils'

const BASE_LENGTH: number = 768
const socket = io.connect('/')

type Props = {
  chunks: Chunks,
}

const chunkWasDragged = (
  draggedChunk: DraggedChunk,
  adjustment: number,
  nameEl: HTMLDivElement,
): ChunkWasDragged => {
  const chunkBcr: ClientRect = draggedChunk.el.getBoundingClientRect()
  const nameBcr: ClientRect = nameEl.getBoundingClientRect()
  const action: ChunkWasDragged = {
    payload: {
      color: getRandomColor(),
      key: draggedChunk.key,
      x: getBoundX(
        draggedChunk.x,
        draggedChunk.deltaX,
        chunkBcr,
        nameBcr,
        adjustment,
      ),
      y: getBoundY(
        draggedChunk.y,
        draggedChunk.deltaY,
        chunkBcr,
        nameBcr,
        adjustment,
      ),
    },
    type: 'CHUNK_WAS_DRAGGED',
  }
  return action
}


const windowWasResized = (h: number, w: number): WindowWasResized => {
  const height = Math.min(BASE_LENGTH, h)
  const width = Math.min(BASE_LENGTH, w)
  const length = Math.min(height, width)
  const adjustment = length / BASE_LENGTH
  const xOffset = w - length
  const action: WindowWasResized = {
    payload: {
      adjustment,
      xOffset,
    },
    type: 'WINDOW_WAS_RESIZED',
  }
  return action
}

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'CHUNK_WAS_DRAGGED':
    case 'CHUNK_WAS_MOVED':
      return {
        ...state,
        chunks: {
          ...state.chunks,
          [action.payload.key]: {
            color: action.payload.color,
            key: action.payload.key,
            x: action.payload.x,
            y: action.payload.y,
          },
        },
      }
    case 'WINDOW_WAS_RESIZED':
      return {
        ...state,
        adjustment: action.payload.adjustment,
        xOffset: action.payload.xOffset,
      }
    default:
      throw new Error()
  }
}


const Name = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const initialState: State = {
    adjustment: 1,
    chunks: props.chunks,
    xOffset: 256,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const handleSocketEvent = (data: any) => {
    console.log('handleSocketEvent, data = ', data)
  }
  const handleWindowResize = () => {
    dispatch(windowWasResized(window.innerHeight, window.innerWidth))
  }
  useEffect(() => {
    socket.on('event', handleSocketEvent)
    window.addEventListener('resize', handleWindowResize)
    return () => {
      socket.off('event', handleSocketEvent)
      window.removeEventListener('resize', handleWindowResize)
    }
  })
  const chunks = Object.values(state.chunks)
  if (chunks.length === 0) {
    return null
  }
  const handleDrag = (draggedChunk: DraggedChunk) => {
    if (ref.current !== null) {
      dispatch(chunkWasDragged(draggedChunk, state.adjustment, ref.current))
    }
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
            key={chunk.key}
            onDrag={handleDrag}
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
        transform: scale(${state.adjustment});
        transform-origin: ${state.xOffset}px 0;
      `}</style>
    </div>
  )
}

export default Name

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

