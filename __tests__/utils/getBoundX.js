import C from '../../src/constants'
import getBoundX from '../../src/utils/getBoundX'

describe('utils/getBoundX', () => {

  test('returns a number', () => {
    const chunkBcr = { left: 0, right: 0 }
    const nameBcr = { left: 0, right: 0 }
    expect(typeof getBoundX(0, 1, chunkBcr, nameBcr, 1)).toBe('number')
  })

  test('returns unadjusted x', () => {
    const x = 0
    const deltaX = 687.96875
    const chunkBcr = { left: 894.96875, right: 975 }
    const nameBcr = { left: 207, right: 975 }
    const adjustment = 1
    const actual = getBoundX(x, deltaX, chunkBcr, nameBcr, adjustment)
    const expected = 687.96875
    expect(actual).toEqual(expected)
  })

  test('returns adjusted x', () => {
    const x = 0
    const deltaX = 690.01675
    const chunkBcr = { left: 335.9222412109375, right: 375 }
    const nameBcr = { left: 0, right: 375 }
    const adjustment = 0.48828125
    const actual = getBoundX(x, deltaX, chunkBcr, nameBcr, adjustment)
    const expected = 687.96875
    expect(actual).toEqual(expected)
  })

})
