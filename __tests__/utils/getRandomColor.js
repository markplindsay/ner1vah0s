import C from '../../src/constants'
import getRandomColor from '../../src/utils/getRandomColor'

describe('utils/getRandomColor', () => {

  test('returns a string', () => {
    expect(typeof getRandomColor()).toBe('string')
  })

  test('returns a string that begins with a hash', () => {
    expect(getRandomColor().startsWith('#')).toBe(true)
  })

  test('returns a string with the correct length', () => {
    expect(getRandomColor().length).toBe(7)
  })

  test('returns a string that is a valid hex color code', () => {
    const validChars = [
      '#', '0', '1', '2', '3', 
      '4', '5', '6', '7', '8', 
      '9', 'A', 'B', 'C', 'D', 
      'E', 'F'
    ]
    const randomColorChars = getRandomColor().split('')
    expect(validChars).toEqual(expect.arrayContaining(randomColorChars))
  })
})
