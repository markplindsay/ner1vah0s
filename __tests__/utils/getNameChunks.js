import C from '../../src/constants'
import getNameChunks from '../../src/utils/getNameChunks'
import nameChunkIsValid from '../../src/utils/nameChunkIsValid'

describe('utils/getNameChunks', () => {

  test('returns an object', () => {
    expect(typeof getNameChunks()).toBe('object')
  })

  test('returns an object with at least one nameChunk', () => {
    expect(Object.keys(getNameChunks()).length).toBeGreaterThanOrEqual(1)
  })

  test('returns an object with valid nameChunk members', () => {
    const nameChunks = getNameChunks()
    for (let key in nameChunks) {
      expect(nameChunkIsValid(nameChunks[key], nameChunks)).toBe(true)      
    }
  })

})
