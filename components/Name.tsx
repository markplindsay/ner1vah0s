import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import React, { useEffect, useReducer, useRef } from 'react'
import io from 'socket.io-client'
import NameChunk from './NameChunk'
import {
  Actions,
  Chunk,
  Chunks,
  ChunkWasDragged,
  ChunkWasMoved,
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
  const nameBcr = nameEl.getBoundingClientRect()
  const action: ChunkWasDragged = {
    payload: {
      color: getRandomColor(),
      key: draggedChunk.key,
      x: getBoundX(
        draggedChunk.x,
        draggedChunk.deltaX,
        draggedChunk.bcr,
        nameBcr,
        adjustment,
      ),
      y: getBoundY(
        draggedChunk.y,
        draggedChunk.deltaY,
        draggedChunk.bcr,
        nameBcr,
        adjustment,
      ),
    },
    type: 'CHUNK_WAS_DRAGGED',
  }
  socket.emit('action', action)
  return action
}

const chunkWasMoved = (
  chunk: Chunk,
): ChunkWasMoved => {
  const action: ChunkWasMoved = {
    payload: chunk,
    type: 'CHUNK_WAS_MOVED',
  }
  return action
}

const windowWasResized = (h: number, w: number): WindowWasResized => {
  const height = Math.min(BASE_LENGTH, h)
  const width = Math.min(BASE_LENGTH, w)
  const length = Math.min(height, width)
  const adjustment = length / BASE_LENGTH
  const marginLeft = (w - length) / 2
  const action: WindowWasResized = {
    payload: {
      adjustment,
      marginLeft,
    },
    type: 'WINDOW_WAS_RESIZED',
  }
  return action
}

const reducer = (state: State, action: Actions): State => {
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
        isReady: true,
        marginLeft: action.payload.marginLeft,
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
    isReady: false,
    marginLeft: 256,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const handleSocketEvent = (action: ChunkWasMoved) => {
    dispatch(chunkWasMoved(action.payload))
  }
  const handleWindowResize = () => {
    dispatch(windowWasResized(window.innerHeight, window.innerWidth))
  }
  useEffect(() => {
    socket.on('action', handleSocketEvent)
    window.addEventListener('resize', handleWindowResize)
    disableBodyScroll(document.body)
    handleWindowResize()
    return () => {
      socket.off('action', handleSocketEvent)
      window.removeEventListener('resize', handleWindowResize)
      enableBodyScroll(document.body)
    }
  }, [])
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
      className={state.isReady ? 'name is-ready' : 'name'}
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
        .name {
          display: block;
          font-weight: bold;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          position: relative;
          width: 768px;
          height: 768px;
          font-size: 108px;
          transform: scale(${state.adjustment});
          transform-origin: top left;
          margin-left: ${state.marginLeft}px;
          visibility: hidden;
        }
        .name.is-ready {
          visibility: visible;
        }
      `}</style>
    </div>
  )
}

export default Name
