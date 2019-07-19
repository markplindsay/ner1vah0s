import morgan from 'morgan'
import { Socket } from '../types'

export const logSocketEvent = (action: string, socket: Socket): void => {
  let remoteAddress = socket.client.conn.remoteAddress
  if (process.env.NODE_ENV === 'production') {
    remoteAddress = socket.client.request.headers['x-real-ip']
  }
  console.log(JSON.stringify({
    date_access: new Date().toISOString(),
    message: `${remoteAddress}: socket ${action}`,
    socket_id: socket.id,
    socket_event: action,
    remote_address: remoteAddress,
  }))
}

export const morganMiddleware = () => morgan((tokens, req, res) => {
  const httpStatus = tokens.status(req, res)
  const httpVersion = tokens['http-version'](req, res)
  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  let ip = tokens['remote-addr'](req, res)
  if (process.env.NODE_ENV === 'production') {
    ip = tokens.req(req, res, 'X-Real-Ip')
  }
  return JSON.stringify({
    date_access: new Date().toISOString(),
    http: {
      method,
      referrer: tokens.referrer(req, res),
      status_code: httpStatus,
      url,
      useragent: tokens['user-agent'](req, res),
      version: httpVersion,
    },
    network: {
      bytes_written: tokens.res(req, res, 'content-length'),
      client: {
        ip,
      },
      response_time: parseFloat(tokens['response-time'](req, res)) * 1000,
    },
    message: `${ip} "${method} ${url} HTTP/${httpVersion}" ${httpStatus}`,
  })
})
