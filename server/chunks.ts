import { Chunks } from '../types'
import { getRandomColor } from '../lib'

const getChunks = (): Chunks => {
  return {
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

export const chunks: Chunks = getChunks()
