import * as _ from 'radashi'

describe('cluster function', () => {
  test('returns an array of arrays', () => {
    const list = [1, 1, 1, 1, 1, 1, 1, 1]
    const result = _.cluster(list)
    const [a, b, c] = result
    expect(a).toEqual([1, 1])
    expect(b).toEqual([1, 1])
    expect(c).toEqual([1, 1])
  })
  test('returns remainder in final cluster', () => {
    const list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2]
    const result = _.cluster(list, 3)
    const [a, b, c, d] = result
    expect(a).toEqual([1, 1, 1])
    expect(b).toEqual([1, 1, 1])
    expect(c).toEqual([1, 1, 1])
    expect(d).toEqual([2, 2])
  })
})
