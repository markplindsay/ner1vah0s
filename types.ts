import { ThunkAction } from 'redux-thunk'

export type Actions = 
  ChunkWasDragged
  | ChunkWasMoved
  | ChunksWereSet
  | NameElWasSet
  | WindowWasResized

export type Chunk = {
  color?: string,
  deltaX?: number,
  deltaY?: number,
  el?: HTMLDivElement,
  key: string,
  x: number,
  y: number,
}

export type Chunks = {
  n?: Chunk,
  er1?: Chunk,
  v?: Chunk,
  ah0?: Chunk,
  s?: Chunk,
}

export type ChunkWasDragged = {
  payload: Chunk,
  type: 'server/CHUNK_WAS_DRAGGED',
}

export type ChunkWasMoved = {
  payload: Chunk,
  type: 'CHUNK_WAS_MOVED',
}

export type ChunksWereSet = {
  payload: Chunks,
  type: 'CHUNKS_WERE_SET',
}

export type NameElWasSet = {
  payload: HTMLDivElement,
  type: 'NAME_EL_WAS_SET',
}

export type WindowWasResized = {
  payload: {
    adjustment: number,
    xOffset: number,
  },
  type: 'WINDOW_WAS_RESIZED',
}

export type State = {
  adjustment: number
  chunks: Chunks,
  nameEl?: HTMLDivElement,
  xOffset: number
}

export type ThunkResult<R> = ThunkAction<R, State, undefined, Actions>
