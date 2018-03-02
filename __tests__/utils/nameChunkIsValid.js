import C from '../../src/constants'
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

  test('returns boolean value for valid nameChunk', () => {
    expect(typeof nameChunkIsValid({
      color: '#FF0000',
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks)).toBe('boolean')
  })

  test('returns true for valid nameChunk', () => {
    expect(nameChunkIsValid({
      color: '#FF0000',
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks)).toBe(true)
  })

  test('returns boolean value for invalid nameChunk', () => {
    expect(typeof nameChunkIsValid({
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks)).toBe('boolean')
  })

  test('returns false for undefined nameChunk', () => {
    expect(nameChunkIsValid(undefined, nameChunks)).toBe(false)    
  })

  test('returns false for null nameChunk', () => {
    expect(nameChunkIsValid(null, nameChunks)).toBe(false)    
  })

  test('returns false for non-object nameChunk', () => {
    expect(nameChunkIsValid('hi', nameChunks)).toBe(false)    
  })

  test('returns false for missing property (color)', () => {
    expect(nameChunkIsValid({
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks)).toBe(false)
  })

  test('returns false for missing property (key)', () => {
    expect(nameChunkIsValid({
      color: '#FF0000',
      x: 0,
      y: 0
    }, nameChunks)).toBe(false)
  })

  test('returns false for missing property (x)', () => {
    expect(nameChunkIsValid({
      color: '#FF0000',
      key: 'n',
      y: 0
    }, nameChunks)).toBe(false)
  })

  test('returns false for missing property (y)', () => {
    expect(nameChunkIsValid({
      color: '#FF0000',
      key: 'n',
      x: 0
    }, nameChunks)).toBe(false)
  })

  test('returns false for bad key', () => {
    expect(nameChunkIsValid({
      color: '#FF0000',
      key: 'zzz',
      x: 0,
      y: 0
    }, nameChunks)).toBe(false)
  })

  test('returns false for invalid color (no hash)', () => {
    expect(nameChunkIsValid({
      color: 'FF0000',
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks)).toBe(false)
  })

  test('returns false for invalid color (length)', () => {
    expect(nameChunkIsValid({
      color: '#FF000',
      key: 'n',
      x: 0,
      y: 0
    }, nameChunks)).toBe(false)
  })

  test('returns false for non-numeric x value', () => {
    expect(nameChunkIsValid({
      color: '#FF000',
      key: 'n',
      x: 'abc',
      y: 0
    }, nameChunks)).toBe(false)
  })

  test('returns false for negative y value', () => {
    expect(nameChunkIsValid({
      color: '#FF000',
      key: 'n',
      x: 0,
      y: -500
    }, nameChunks)).toBe(false)
  })

  test('returns false for x value exceeding C.BASE_LENGTH', () => {
    expect(nameChunkIsValid({
      color: '#FF000',
      key: 'n',
      x: 0,
      y: C.BASE_LENGTH + 1
    }, nameChunks)).toBe(false)
  })

})
