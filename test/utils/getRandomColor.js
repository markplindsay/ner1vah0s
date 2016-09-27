import C from '../../src/constants'
import chai from 'chai'
import getRandomColor from '../../src/utils/getRandomColor'

describe('utils/getRandomColor', () => {

  it('returns a string', () => {
    chai.assert.isString(getRandomColor())
  })

  it('returns a string that begins with a hash', () => {
    chai.assert.isTrue(getRandomColor().startsWith('#'))
  })

  it('returns a string with the correct length', () => {
    chai.assert.lengthOf(getRandomColor(), 7)
  })

  it('returns a string that is a valid hex color code', () => {
    chai.assert.includeMembers([
      '#', '0', '1', '2', '3', 
      '4', '5', '6', '7', '8', 
      '9', 'A', 'B', 'C', 'D', 
      'E', 'F'
    ], getRandomColor().split(''))
  })

})
