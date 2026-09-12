import * as _ from 'radashi'

describe('spiralSum', () => {
  it('calculates the correct spiral sum for various inputs', () => {
    expect(_.spiralSum(0)).toBe(0)
    expect(_.spiralSum(1)).toBe(1)
    expect(_.spiralSum(2)).toBe(4)
    expect(_.spiralSum(3)).toBe(9)
    expect(_.spiralSum(4)).toBe(16)
    expect(_.spiralSum(5)).toBe(25)
  })

  it('returns 0 for negative inputs', () => {
    expect(_.spiralSum(-1)).toBe(0)
    expect(_.spiralSum(-100)).toBe(0)
  })
})
