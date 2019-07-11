import { IncomingMessage } from 'http'
import * as t from 'io-ts'
import { NextPageContext } from 'next'
import { Server as BaseServer, Socket as BaseSocket } from 'socket.io'

declare global {
  namespace Express {
    interface Request {
      chunks?: Chunks
    }
    interface Response { }
    interface Application { }
  }
}

export const ChunkC = t.type({
  color: t.string,
  key: t.union([
    t.literal('n'),
    t.literal('er1'),
    t.literal('v'),
    t.literal('ah0'),
    t.literal('s'),
  ]),
  x: t.number,
  y: t.number,
})
export type Chunk = t.TypeOf<typeof ChunkC>

export const ChunksC = t.type({
  n: ChunkC,
  er1: ChunkC,
  v: ChunkC,
  ah0: ChunkC,
  s: ChunkC,
})
export type Chunks = t.TypeOf<typeof ChunksC>

export const ChunkWasDraggedC = t.type({
  payload: ChunkC,
  type: t.literal('CHUNK_WAS_DRAGGED'),
})
export type ChunkWasDragged = t.TypeOf<typeof ChunkWasDraggedC>

export const ChunkWasMovedC = t.type({
  payload: ChunkC,
  type: t.literal('CHUNK_WAS_MOVED'),
})
export type ChunkWasMoved = t.TypeOf<typeof ChunkWasMovedC>

// const ClientRectC = new t.Type<ClientRect, string, ClientRect>(
//   'ClientRect',
//   (u): u is ClientRect => u instanceof ClientRect,
//   (input, context) => {
//     if (typeof input === 'object'
//       && input.bottom !== undefined
//       && input.height !== undefined
//       && input.left !== undefined
//       && input.right !== undefined
//       && input.top !== undefined
//       && input.width !== undefined) {
//       return t.success(input)
//     }
//     return t.failure(input, context)
//   },
//   (a) => JSON.stringify(a),
// )
// ClientRectC.decode = (i) => {
//   let str
//   try {
//     str = JSON.stringify(i)
//   }
//   catch {
//     return t.failure(i)
//   }
//   return t.success(str)
// }

export const DraggedChunkC = t.type({
  deltaX: t.number,
  deltaY: t.number,
  bcr: t.any,
  key: t.union([
    t.literal('n'),
    t.literal('er1'),
    t.literal('v'),
    t.literal('ah0'),
    t.literal('s'),
  ]),
  x: t.number,
  y: t.number,
})
export interface DraggedChunk extends t.TypeOf<typeof DraggedChunkC> {
  bcr: ClientRect
}

export interface PageContext extends NextPageContext {
  req?: IncomingMessage & { chunks?: Chunks }
}

interface Server extends BaseServer {
  eio: {
    clientsCount: number
  }
}

export interface Socket extends BaseSocket {
  server: Server
}

export const WindowWasResizedC = t.type({
  payload: t.type({
    adjustment: t.number,
    xOffset: t.number,
  }),
  type: t.literal('WINDOW_WAS_RESIZED'),
})
export type WindowWasResized = t.TypeOf<typeof WindowWasResizedC>

export const StateC = t.type({
  adjustment: t.number,
  chunks: ChunksC,
  xOffset: t.number,
})
export type State = t.TypeOf<typeof StateC>

export const ActionsC = t.union([ 
  ChunkWasDraggedC,
  ChunkWasMovedC,
  WindowWasResizedC,
])
export type Actions = t.TypeOf<typeof ActionsC>
