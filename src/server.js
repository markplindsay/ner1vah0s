import C from './constants'
import express from 'express'
import getNameChunks from './utils/getNameChunks'
import getRandomColor from './utils/getRandomColor'
import http from 'http'
import socketIo from 'socket.io'
import nameChunkIsValid from './utils/nameChunkIsValid'
import tsml from 'tsml'
import uuid from 'uuid'

let app = express()
let server = http.createServer(app)

server.listen(5000, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('listening on 5000')
})

app.use(express.static(__dirname + '/../public'))

const config = {
  NER1VAH0S_ACTION_KEY: uuid.v4().replace(/\-/g, ''),
  NER1VAH0S_URL: process.env.NER1VAH0S_URL
}

app.get('/', (req, res) => {
  res.send(tsml`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, 
        maximum-scale=1.0, user-scalable=no">
        <link rel="stylesheet" type="text/css" href="/ner1vah0s/style.css" />
        <script>
          var config=${JSON.stringify(config)}
        </script>
        <title>N ER1 V AH0 S</title>
      </head>
      <body>
        <div id="mount"></div>
      </body>
      <script src="/ner1vah0s/bundle.js"></script>
    </html>
  `)
})

let nameChunks = getNameChunks()

let io = socketIo(server)

io.on('connection', (socket) => {
  socket.on('action', (action) => {
    if (action.key !== config.NER1VAH0S_ACTION_KEY) {
      return
    }
    if (action.type === C.NAME_CHUNK_DRAGGED) {
      if (!nameChunkIsValid(action.payload, nameChunks)) {
        return
      }
      nameChunks[action.payload.key] = {
        color: action.payload.color,
        key: action.payload.key,
        x: action.payload.x,
        y: action.payload.y
      }
      socket.broadcast.emit('action', {
        type: C.NAME_CHUNK_MOVED,
        payload: {
          color: action.payload.color,
          key: action.payload.key,
          x: action.payload.x,
          y: action.payload.y
        }
      })
    }
  })
  socket.emit('action', {
    type: C.NAME_CHUNKS_SET,
    payload: {
      nameChunks: nameChunks
    }
  })
})

process.on('SIGINT', () => {
  process.exit()
})
