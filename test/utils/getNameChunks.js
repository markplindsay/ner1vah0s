import C from '../../src/constants'
import chai from 'chai'
import getNameChunks from '../../src/utils/getNameChunks'
import nameChunkIsValid from '../../src/utils/nameChunkIsValid'

describe('utils/getNameChunks', () => {

  it('returns an object', () => {
    chai.assert.isObject(getNameChunks())
  })

  it('returns an object with at least one nameChunk', () => {
    chai.assert.isAtLeast(Object.keys(getNameChunks()).length, 1)
  })

  it('returns an object with valid nameChunk members', () => {
    const nameChunks = getNameChunks()
    for (let key in nameChunks) {
      chai.assert.isTrue(nameChunkIsValid(nameChunks[key], nameChunks))      
    }
  })

})
