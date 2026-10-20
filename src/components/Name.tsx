'use client'

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { getBoundX, getBoundY, getPort, getRandomColor } from 'src/lib'
import type { Chunk, Chunks } from 'src/server'
import NameChunk from './NameChunk'

const BASE_LENGTH: number = 768

const websocket = new WebSocket(`http://localhost:${getPort()}/api/ws`)

export type DraggedChunk = {
  deltaX: number
  deltaY: number
  bcr: DOMRect
  key: 'n' | 'er1' | 'v' | 'ah0' | 's'
  x: number
  y: number
}

type ChunkWasDraggedAction = {
  payload: Chunk
  type: 'CHUNK_WAS_DRAGGED'
}

function chunkWasDragged(
  draggedChunk: DraggedChunk,
  adjustment: number,
  nameEl: HTMLDivElement
): ChunkWasDraggedAction {
  const nameBcr = nameEl.getBoundingClientRect()
  const chunkWasDraggedAction: ChunkWasDraggedAction = {
    payload: {
      color: getRandomColor(),
      key: draggedChunk.key,
      x: getBoundX(
        draggedChunk.x,
        draggedChunk.deltaX,
        draggedChunk.bcr,
        nameBcr,
        adjustment
      ),
      y: getBoundY(
        draggedChunk.y,
        draggedChunk.deltaY,
        draggedChunk.bcr,
        nameBcr,
        adjustment
      ),
    },
    type: 'CHUNK_WAS_DRAGGED',
  }
  websocket.send(JSON.stringify(chunkWasDraggedAction))
  return chunkWasDraggedAction
}

export type ChunkWasMovedAction = {
  payload: Chunk
  type: 'CHUNK_WAS_MOVED'
}

function chunkWasMoved(chunk: Chunk): ChunkWasMovedAction {
  const chunkWasMovedAction: ChunkWasMovedAction = {
    payload: chunk,
    type: 'CHUNK_WAS_MOVED',
  }
  return chunkWasMovedAction
}

type WindowWasResizedAction = {
  payload: {
    adjustment: number
    marginLeft: number
  }
  type: 'WINDOW_WAS_RESIZED'
}

function windowWasResized(h: number, w: number): WindowWasResizedAction {
  const height = Math.min(BASE_LENGTH, h)
  const width = Math.min(BASE_LENGTH, w)
  const length = Math.min(height, width)
  const adjustment = length / BASE_LENGTH
  const marginLeft = (w - length) / 2
  const windowWasResizedAction: WindowWasResizedAction = {
    payload: {
      adjustment,
      marginLeft,
    },
    type: 'WINDOW_WAS_RESIZED',
  }
  return windowWasResizedAction
}

type Action =
  ChunkWasDraggedAction | ChunkWasMovedAction | WindowWasResizedAction

type State = {
  adjustment: number
  chunks: Chunks
  isReady: boolean
  marginLeft: number
}

function reducer(state: State, action: Action): State {
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

export default function Name({ chunks }: { chunks: Chunks }) {
  const ref = useRef<HTMLDivElement>(null)

  const initialState: State = {
    adjustment: 1,
    chunks,
    isReady: false,
    marginLeft: 256,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleMessageEvent = useCallback((event: MessageEvent) => {
    const parsedEvent = JSON.parse(event.data)
    if (parsedEvent.type === 'CHUNK_WAS_MOVED') {
      dispatch(chunkWasMoved(parsedEvent.payload))
    }
  }, [])

  const handleWindowResize = useCallback(() => {
    dispatch(windowWasResized(window.innerHeight, window.innerWidth))
  }, [])

  const handleDrag = useCallback(
    (draggedChunk: DraggedChunk) => {
      if (ref.current !== null) {
        dispatch(chunkWasDragged(draggedChunk, state.adjustment, ref.current))
      }
    },
    [state.adjustment]
  )

  useEffect(() => {
    websocket.addEventListener('message', handleMessageEvent)
    window.addEventListener('resize', handleWindowResize)
    disableBodyScroll(document.body)
    handleWindowResize()
    return () => {
      websocket.removeEventListener('message', handleMessageEvent)
      window.removeEventListener('resize', handleWindowResize)
      enableBodyScroll(document.body)
    }
  }, [handleMessageEvent, handleWindowResize])

  const memorizedChunks = useMemo(
    () => Object.values(state.chunks),
    [state.chunks]
  )
  if (memorizedChunks.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      style={{
        display: 'block',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: '108px',
        fontWeight: 'bold',
        height: '768px',
        marginLeft: `${state.marginLeft}px`,
        position: 'relative',
        transform: `scale(${state.adjustment})`,
        transformOrigin: 'top left',
        visibility: state.isReady ? 'visible' : 'hidden',
        width: '768px',
      }}
    >
      {memorizedChunks.map((chunk: Chunk | undefined) => {
        if (chunk === undefined) {
          return null
        }
        return <NameChunk chunk={chunk} key={chunk.key} onDrag={handleDrag} />
      })}
    </div>
  )
}
