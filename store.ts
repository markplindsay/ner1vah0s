import { applyMiddleware, createStore, Store } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import { ThunkDispatch } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import {
  Actions,
  Chunk,
  ChunkWasDragged,
  NameElWasSet,
  State,
  ThunkResult,
  WindowWasResized,
} from './types'
import { getBoundX, getBoundY, getRandomColor } from './utils'

const BASE_LENGTH: number = 768

const reducer = (
  state: State = {
    adjustment: 1,
    chunks: {},
    xOffset: 256,
  },
  action: Actions,
): State => {
  console.log(action)
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
    case 'CHUNKS_WERE_SET':
      return {
        ...state,
        chunks: action.payload,
      }
    case 'NAME_EL_WAS_SET':
      return {
        ...state,
        nameEl: action.payload,
      }
    case 'WINDOW_WAS_RESIZED':
      return {
        ...state,
        adjustment: action.payload.adjustment,
        xOffset: action.payload.xOffset,
      }
    default:
      return state
  }
}

export const chunkWasDragged = (chunk: Chunk): ThunkResult<void> => (
  dispatch: ThunkDispatch<State, undefined, Actions>,
  getState: () => State,
): void => {
  const adjustment: number = getState().adjustment
  const nameEl: HTMLDivElement | undefined = getState().nameEl
  if (chunk.deltaX === undefined
    || chunk.deltaY === undefined
    || chunk.el === undefined
    || nameEl === undefined) {
    return
  }
  const chunkBcr: ClientRect = chunk.el.getBoundingClientRect()
  const nameBcr: ClientRect = nameEl.getBoundingClientRect()
  const action: ChunkWasDragged = {
    payload: {
      color: getRandomColor(),
      key: chunk.key,
      x: getBoundX(chunk.x, chunk.deltaX, chunkBcr, nameBcr, adjustment),
      y: getBoundY(chunk.y, chunk.deltaY, chunkBcr, nameBcr, adjustment),
    },
    type: 'server/CHUNK_WAS_DRAGGED',
  }
  dispatch(action)
}

export const nameElWasSet = (nameEl: HTMLDivElement): NameElWasSet => ({
  payload: nameEl,
  type: 'NAME_EL_WAS_SET',
})

export const windowWasResized = (h: number, w: number): WindowWasResized => {
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

const socket = io.connect('/')
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')
const enhancer = composeWithDevTools(applyMiddleware(
  thunk as ThunkMiddleware<State, Actions>,
  socketIoMiddleware,
))

export const makeStore = (initialState: State, _options: any): Store => {
  return createStore(reducer, initialState, enhancer)
}
