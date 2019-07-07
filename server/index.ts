import 'express-async-errors'
import express from 'express'
import http from 'http'
import next from 'next'
import socketIo from 'socket.io'
import { parse } from 'url'
import { Actions, ChunkWasMoved } from '../types'

const port = parseInt(process.env.PORT || '5000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const expressApp = express()
  expressApp.get('/', (req, res) => {
    return app.render(req, res, '/', req.query)
  })
  expressApp.get('*', (req, res) => {
    const parsedUrl = parse(req.url!, true)
    return handle(req, res, parsedUrl)
  })
  const server = http.createServer(expressApp)
  let io = socketIo()
  io.attach(server)
  io.on('connection', (socket) => {
    socket.on('action', (action: Actions) => {
      if (action.type === 'server/CHUNK_WAS_DRAGGED') {
      //   // if (!nameChunkIsValid(action.payload, nameChunks)) {
      //   //   return
      //   // }
        if (action.payload.key === 'n'
          || action.payload.key === 'er1'
          || action.payload.key === 'v'
          || action.payload.key === 'ah0'
          || action.payload.key === 's') {
          const chunkWasMoved: ChunkWasMoved = {
            payload: {
              color: action.payload.color,
              key: action.payload.key,
              x: action.payload.x,
              y: action.payload.y
            },
            type: 'CHUNK_WAS_MOVED',
          }
          console.log('emitting ', chunkWasMoved)
          socket.emit('action', chunkWasMoved)
        }
      }
    })
  })
  server.listen(port, () => {
    console.log(
      `> Server listening on ${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    )
  })
})

process.on('SIGINT', () => {
  process.exit()
})
