import express from 'express'
import http from 'http'
import next from 'next'
import { WebSocketServer } from 'ws'
import { getPort, getRandomColor } from 'src/lib'
import type { ChunkWasMovedAction } from 'src/components/Name'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const expressApp = express()
  expressApp.get('/api/chunks', (_req, res) => {
    const chunks = getChunks()
    return res.json(chunks)
  })
  expressApp.get(/(.*)/, (req, res) => {
    return handle(req, res)
  })
  const server = http.createServer(expressApp)
  const wss = new WebSocketServer({ noServer: true })
  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      const action = JSON.parse(data.toString())
      if (action.type === 'CHUNK_WAS_DRAGGED') {
        const chunk: Chunk = action.payload
        const { key } = chunk
        const chunks = getChunks()
        chunks[key] = action.payload
        const chunkWasMovedAction: ChunkWasMovedAction = {
          ...action,
          type: 'CHUNK_WAS_MOVED',
        }
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(chunkWasMovedAction))
          }
        })
      }
    })
  })

  server.on('upgrade', (req, socket, head) => {
    const { pathname } = new URL(req.url!, `http://localhost:${getPort()}`)
    switch (pathname) {
      case '/_next/hmr':
        nextApp.getUpgradeHandler()(req, socket, head)
        break
      case '/api/ws':
        wss.handleUpgrade(req, socket, head, (ws) => {
          wss.emit('connection', ws, req)
        })
        break
      default:
        socket.destroy()
    }
  })

  server.listen(getPort(), () => {
    if (dev) {
      console.log(`> Server listening on ${getPort()} as development`)
    }
  })
})

export type Chunk = {
  color: string
  key: 'n' | 'er1' | 'v' | 'ah0' | 's'
  x: number
  y: number
}

export type Chunks = {
  n: Chunk
  er1: Chunk
  v: Chunk
  ah0: Chunk
  s: Chunk
}

let chunks: Chunks | undefined = undefined
function getChunks(): Chunks {
  if (chunks === undefined) {
    chunks = {
      n: {
        color: getRandomColor(),
        key: 'n',
        x: 0,
        y: 0,
      },
      er1: {
        color: getRandomColor(),
        key: 'er1',
        x: 110,
        y: 0,
      },
      v: {
        color: getRandomColor(),
        key: 'v',
        x: 348,
        y: 0,
      },
      ah0: {
        color: getRandomColor(),
        key: 'ah0',
        x: 446,
        y: 0,
      },
      s: {
        color: getRandomColor(),
        key: 's',
        x: 690,
        y: 0,
      },
    }
  }
  return chunks
}

process.on('SIGINT', () => {
  process.exit()
})
