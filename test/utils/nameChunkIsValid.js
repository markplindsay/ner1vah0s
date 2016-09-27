import C from '../../src/constants'
import chai from 'chai'
import nameChunkIsValid from '../../src/utils/nameChunkIsValid'

const nameChunks = {
  n: {
    color: '#000000',
    x: 0,
    y: 0
  },
  er1: {
    color: '#000000',
    x: 110,
    y: 0
  },
  v: {
    color: '#000000',
    x: 348,
    y: 0
  },
  ah0: {
    color: '#000000',
    x: 446,
    y: 0
  },
  s: {
    color: '#000000',
    x: 690,
    y: 0
  }
}

describe('utils/nameChunkIsValid', () => {

  it('returns boolean value for valid nameChunk', () => {
    chai.assert.isBoolean(nameChunkIsValid({
      color: '#FF0000',
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks))
  })

  it('returns true for valid nameChunk', () => {
    chai.assert.isTrue(nameChunkIsValid({
      color: '#FF0000',
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks))
  })

  it('returns boolean value for invalid nameChunk', () => {
    chai.assert.isBoolean(nameChunkIsValid({
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks))
  })

  it('returns false for undefined nameChunk', () => {
    chai.assert.isFalse(nameChunkIsValid(undefined, nameChunks))    
  })

  it('returns false for null nameChunk', () => {
    chai.assert.isFalse(nameChunkIsValid(null, nameChunks))    
  })

  it('returns false for non-object nameChunk', () => {
    chai.assert.isFalse(nameChunkIsValid('hi', nameChunks))    
  })

  it('returns false for missing property (color)', () => {
    chai.assert.isFalse(nameChunkIsValid({
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks))
  })

  it('returns false for missing property (key)', () => {
    chai.assert.isFalse(nameChunkIsValid({
      color: '#FF0000',
      x: 0,
      y: 0
    }, nameChunks))
  })

  it('returns false for missing property (x)', () => {
    chai.assert.isFalse(nameChunkIsValid({
      color: '#FF0000',
      key: 'n',
      y: 0
    }, nameChunks))
  })

  it('returns false for missing property (y)', () => {
    chai.assert.isFalse(nameChunkIsValid({
      color: '#FF0000',
      key: 'n',
      x: 0
    }, nameChunks))
  })

  it('returns false for bad key', () => {
    chai.assert.isFalse(nameChunkIsValid({
      color: '#FF0000',
      key: 'zzz',
      x: 0,
      y: 0
    }, nameChunks))
  })

  it('returns false for invalid color (no hash)', () => {
    chai.assert.isFalse(nameChunkIsValid({
      color: 'FF0000',
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks))
  })

  it('returns false for invalid color (length)', () => {
    chai.assert.isFalse(nameChunkIsValid({
      color: '#FF000',
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks))
  })

  it('returns false for non-numeric x value', () => {
    chai.assert.isFalse(nameChunkIsValid({
      color: '#FF000',
      key: 'n',
      x: 'abc',
      y: 0
    }, nameChunks))
  })

  it('returns false for negative y value', () => {
    chai.assert.isFalse(nameChunkIsValid({
      color: '#FF000',
      key: 'n',
      x: 0,
      y: -500
    }, nameChunks))
  })

  it('returns false for x value exceeding C.BASE_LENGTH', () => {
    chai.assert.isFalse(nameChunkIsValid({
      color: '#FF000',
      key: 'n',
      x: 0,
      y: C.BASE_LENGTH + 1
    }, nameChunks))
  })

})
