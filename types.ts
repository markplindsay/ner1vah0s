declare global {
  namespace Express {
    interface Request {
      chunks?: Chunks
    }
    interface Response { }
    interface Application { }
  }
}

export type Actions = 
  ChunkWasDragged
  | ChunkWasMoved
  | ChunksWereSet
  | NameElWasSet
  | WindowWasResized

export type Chunk = {
  color: string
  key: string
  x: number
  y: number
}

export type Chunks = {
  n?: Chunk
  er1?: Chunk
  v?: Chunk
  ah0?: Chunk
  s?: Chunk
}

export type ChunkWasDragged = {
  payload: Chunk
  type: 'CHUNK_WAS_DRAGGED'
}

export type ChunkWasMoved = {
  payload: Chunk
  type: 'CHUNK_WAS_MOVED'
}

export type ChunksWereSet = {
  payload: Chunks
  type: 'CHUNKS_WERE_SET'
}

export type DraggedChunk = {
  deltaX: number
  deltaY: number
  el: HTMLDivElement
  key: string
  x: number
  y: number
}
export type NameElWasSet = {
  payload: HTMLDivElement
  type: 'NAME_EL_WAS_SET'
}

export type WindowWasResized = {
  payload: {
    adjustment: number
    xOffset: number
  },
  type: 'WINDOW_WAS_RESIZED'
}

export type State = {
  adjustment: number
  chunks: Chunks
  xOffset: number
}
