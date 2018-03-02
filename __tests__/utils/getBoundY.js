import C from '../../src/constants'
import getBoundY from '../../src/utils/getBoundY'

describe('utils/getBoundY', () => {
  
  test('returns a number', () => {
    const y = 0
    const deltaY = 1
    const chunkBcr = { height: 0, top: 0 }
    const nameBcr = { height: 0, top: 0 }
    const adjustment = 1
    expect(typeof getBoundY(y, deltaY, chunkBcr, nameBcr, adjustment)).toBe('number')
  })

  test('returns unadjusted y', () => {
    const y = 0
    const deltaY = 639.648125
    const chunkBcr = { height: 131, top: 637 }
    const nameBcr = { height: 768, top: 0 }
    const adjustment = 1
    const actual = getBoundY(y, deltaY, chunkBcr, nameBcr, adjustment)
    const expected = 637
    expect(actual).toEqual(expected)
  })

  test('returns adjusted y', () => {
    const y = 0
    const deltaY = 639.648125
    const chunkBcr = { height: 63.96484375, top: 311.03515625 }
    const nameBcr = { height: 375, top: 0 }
    const adjustment = 0.48828125
    const actual = getBoundY(y, deltaY, chunkBcr, nameBcr, adjustment)
    const expected = 637
    expect(actual).toEqual(expected)
  })

})