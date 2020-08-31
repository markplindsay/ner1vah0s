import { pipe } from 'fp-ts/lib/pipeable'
import { fold } from 'fp-ts/lib/Either'
import { Errors } from 'io-ts'
import { chunks } from './chunks'
import { logSocketEvent } from './logging'
import { Chunk, ChunkC, ChunkWasDragged, ChunkWasMoved, Socket } from '../types'

export const handleSocketConnect = (socket: Socket) => {
  logSocketEvent('connect', socket)
  socket.on('action', (action: ChunkWasDragged) => {
    if (action.type === 'CHUNK_WAS_DRAGGED') {
      pipe(
        ChunkC.decode(action.payload),
        fold(
          (errors: Errors) => {
            console.log(errors)
          },
          (chunk: Chunk) => {
            const { key } = chunk
            chunks[key] = action.payload
            const chunkWasMoved: ChunkWasMoved = {
              ...action,
              type: 'CHUNK_WAS_MOVED',
            }
            socket.broadcast.emit('action', chunkWasMoved)
          }
        )
      )
    }
  })
  socket.on('disconnect', () => {
    logSocketEvent('disconnect', socket)
  })
}
