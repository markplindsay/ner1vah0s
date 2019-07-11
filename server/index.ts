import 'express-async-errors'
import express from 'express'
import http from 'http'
import next from 'next'
import socketIo from 'socket.io'
import { parse } from 'url'
import { chunks } from './chunks'
import { morganMiddleware } from './logging'
import { handleSocketConnect } from './socket'

const port = parseInt(process.env.PORT || '5000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const expressApp = express()
  expressApp.use(morganMiddleware())
  expressApp.get('/', (req, res) => {
    req.chunks = chunks
    return app.render(req, res, '/', req.query)
  })
  expressApp.get('*', (req, res) => {
    const parsedUrl = parse(req.url!, true)
    return handle(req, res, parsedUrl)
  })
  const server = http.createServer(expressApp)
  let io = socketIo()
  io.attach(server)
  io.on('connect', handleSocketConnect)
  server.listen(port, () => {
    if (dev) {
      console.log(`> Server listening on ${port} as development`)
    }
  })
})

process.on('SIGINT', () => {
  process.exit()
})
