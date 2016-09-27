import C from '../constants'

export default function nameChunkIsValid (nameChunk, nameChunks) {
  if (nameChunk === undefined || nameChunk === null) {
    return false
  }
  if (typeof nameChunk !== 'object') {
    return false
  }
  if (nameChunk.color === undefined || 
      nameChunk.key === undefined ||
      nameChunk.x === undefined ||
      nameChunk.y === undefined) {
    return false
  }
  if (nameChunks[nameChunk.key] === undefined) {
    return false
  }
  if (nameChunk.color[0] !== '#') {
    return false
  }
  if (nameChunk.color.length !== 7) {
    return false
  }
  if (!_isNumber(nameChunk.x) || !_isNumber(nameChunk.y)) {
    return false
  }
  if (nameChunk.x < 0 || nameChunk.y < 0) {
    return false
  }
  if (nameChunk.x > C.BASE_LENGTH || nameChunk.y > C.BASE_LENGTH) {
    return false
  }
  return true
}

const _isNumber = (num) => {
  if (typeof num !== 'number' && typeof num !== 'string') {
    return false
  }
  var n = +num
  return (n - n + 1) >= 0 && num !== ''
}
