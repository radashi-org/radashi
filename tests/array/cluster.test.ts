import * as _ from 'radashi'

describe('cluster', () => {
  test('returns an array of arrays', () => {
    const data = [1, 1, 1, 1, 1, 1, 1, 1]
    expect(_.cluster(data, 2)).toEqual([
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ])
  })

  test('returns remainder in final cluster', () => {
    const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2]
    expect(_.cluster(data, 3)).toEqual([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [2, 2],
    ])
  })

  test('uses default size of 2 when no size provided', () => {
    expect(_.cluster([1, 2, 3, 4, 5])).toEqual([[1, 2], [3, 4], [5]])
  })

  test('handles empty array', () => {
    expect(_.cluster([], 2)).toEqual([])
  })

  test('creates individual clusters when size is 1', () => {
    expect(_.cluster([1, 2, 3, 4], 1)).toEqual([[1], [2], [3], [4]])
  })

  test('returns empty list when size <= 0', () => {
    const data = [1, 2, 3, 4]

    expect(_.cluster(data, 0)).toEqual([])
    expect(_.cluster(data, -1)).toEqual([])
    expect(_.cluster(data, Number.NEGATIVE_INFINITY)).toEqual([])
  })

  test('creates a single cluster when size exceeds array length', () => {
    expect(_.cluster([1, 2, 3], 5)).toEqual([[1, 2, 3]])
  })

  test('handles very large size values', () => {
    expect(_.cluster([1, 2, 3], Number.MAX_SAFE_INTEGER)).toEqual([[1, 2, 3]])
  })
})
