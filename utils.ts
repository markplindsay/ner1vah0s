import { Chunks } from './types'

export const keyIsValid = (key: string): boolean => {
  const validKeys = ['n', 'er1', 'v', 'ah0', 's']
  return validKeys.indexOf(key) !== -1
}

export const getBoundX = (
  x: number,
  deltaX: number,
  chunkBcr: ClientRect, 
  nameBcr: ClientRect, 
  adjustment: number,
): number => {
  let boundX = x + (deltaX / adjustment)
  let left = (chunkBcr.left - nameBcr.left - (chunkBcr.left - nameBcr.left))
  left /= adjustment
  let right = (chunkBcr.left - nameBcr.left - (chunkBcr.right - nameBcr.right))
  right /= adjustment
  boundX = Math.min(boundX, right)
  boundX = Math.max(boundX, left)
  return boundX
}

export const getBoundY = (
  y: number,
  deltaY: number, 
  chunkBcr: ClientRect,
  nameBcr: ClientRect,
  adjustment: number,
): number => {
  let boundY = y + (deltaY / adjustment)
  const bottom = (nameBcr.height - chunkBcr.height) / adjustment
  const top = nameBcr.top / adjustment
  boundY = Math.min(boundY, bottom)
  boundY = Math.max(boundY, top)
  return boundY
}

export const getChunks = (): Chunks => {
  return {
    n: {
      color: getRandomColor(),
      key: 'n',
      x: 0,
      y: 0
    },
    er1: {
      color: getRandomColor(),
      key: 'er1',
      x: 110,
      y: 0
    },
    v: {
      color: getRandomColor(),
      key: 'v',
      x: 348,
      y: 0
    },
    ah0: {
      color: getRandomColor(),
      key: 'ah0',
      x: 446,
      y: 0
    },
    s: {
      color: getRandomColor(),
      key: 's',
      x: 690,
      y: 0
    }
  }
}

export const getRandomColor = (): string => {
  const hex = Math.random().toString(16).slice(2, 8).toUpperCase()
  return `#${hex}`
}
