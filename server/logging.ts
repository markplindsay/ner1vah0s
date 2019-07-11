import morgan from 'morgan'
import { Socket } from '../types'

export const logSocketEvent = (action: string, socket: Socket): void => {
  console.log(JSON.stringify({
    date: new Date().toISOString(),
    socketId: socket.id,
    socketEvent: action,
    status: 'info',
    remoteAddress: socket.client.conn.remoteAddress,
  })) 
}

export const morganMiddleware = () => morgan((tokens, req, res) => {
  const httpStatus = parseInt(tokens.status(req, res), 10)
  let status = 'info'
  if (httpStatus > 399) {
    status = 'warn'
  }
  else if (httpStatus > 499) {
    status = 'error'
  }
  return JSON.stringify({
    contentLength: tokens.res(req, res, 'content-length'),
    date: new Date().toISOString(),
    httpStatus: httpStatus.toString(),
    httpVersion: tokens['http-version'](req, res),
    method: tokens.method(req, res),
    referrer: tokens.referrer(req, res),
    remoteAddress: tokens['remote-addr'](req, res),
    responseTime: parseFloat(tokens['response-time'](req, res)) * 1000,
    status,
    url: tokens.url(req, res),
    userAgent: tokens['user-agent'](req, res),
  })
})
