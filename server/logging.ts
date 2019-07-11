import morgan from 'morgan'
import { Socket } from '../types'

export const logSocketEvent = (action: string, socket: Socket): void => {
  console.log(JSON.stringify({
    date: new Date().toISOString(),
    message: `Socket ${action} from ${socket.client.conn.remoteAddress}`,
    socketId: socket.id,
    socketEvent: action,
    status: 'info',
    remoteAddress: socket.client.conn.remoteAddress,
  })) 
}

export const morganMiddleware = () => morgan((tokens, req, res) => {
  const httpStatus = tokens.status(req, res)
  const httpVersion = tokens['http-version'](req, res)
  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  let remoteAddress = tokens['remote-addr'](req, res)
  if (process.env.NODE_ENV === 'production') {
    remoteAddress = tokens.req(req, res, 'X-Real-Ip')
  }
  return JSON.stringify({
    contentLength: tokens.res(req, res, 'content-length'),
    date: new Date().toISOString(),
    httpStatus,
    httpVersion,
    message: `"${method} ${url} HTTP/${httpVersion}" ${httpStatus}`, 
    method,
    referrer: tokens.referrer(req, res),
    remoteAddress,
    responseTime: parseFloat(tokens['response-time'](req, res)) * 1000,
    url,
    userAgent: tokens['user-agent'](req, res),
  })
})
