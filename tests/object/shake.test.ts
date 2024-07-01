import * as _ from 'radashi'

describe('shake', () => {
  test('removes all undefined values', () => {
    const result = _.shake({
      x: 2,
      y: null,
      z: undefined,
      o: false,
      r: 'x',
    })
    expect(result).toEqual({
      x: 2,
      y: null,
      o: false,
      r: 'x',
    })
  })
  test('removes values based on filter function input', () => {
    const result = _.shake(
      {
        x: 2,
        y: null,
        z: undefined,
        o: false,
        r: 'x',
      },
      val => val !== 'x',
    )
    expect(result).toEqual({
      r: 'x',
    })
  })
  test('handles undefined input', () => {
    const result = _.shake(undefined!)
    expect(result).toEqual({})
  })
})
