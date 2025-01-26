import * as _ from 'radashi'

describe('zipToObject', () => {
  test('zips to an object correctly', () => {
    const result = _.zipToObject(['a', 'b'], [1, 2])
    expect(result).toEqual({ a: 1, b: 2 })
  })

  test('zips to an object with custom map function', () => {
    const result = _.zipToObject(['a', 'b'], (k, i) => k + i)
    expect(result).toEqual({ a: 'a0', b: 'b1' })
  })

  test('zips to an object with only one value', () => {
    const result = _.zipToObject(['a', 'b'], 1)
    expect(result).toEqual({ a: 1, b: 1 })
  })
})
