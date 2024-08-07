import * as _ from 'radashi'

describe('circularShift', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  test('should shift array right 3 positions', () => {
    const result = _.circularShift(arr, 3)
    expect(result).toEqual([7, 8, 9, 1, 2, 3, 4, 5, 6])
  })
  test('should shift array left 3 positions', () => {
    const result = _.circularShift(arr, -3)
    expect(result).toEqual([4, 5, 6, 7, 8, 9, 1, 2, 3])
  })
  test('should shift array right 6 positions', () => {
    const result = _.circularShift(arr, 15)
    expect(result).toEqual([4, 5, 6, 7, 8, 9, 1, 2, 3])
  })
  test('should shift array left 6 positions', () => {
    const result = _.circularShift(arr, -15)
    expect(result).toEqual([7, 8, 9, 1, 2, 3, 4, 5, 6])
  })
  test('should keep array as is', () => {
    const result = _.circularShift(arr, 0)
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
  test('should keep array as is', () => {
    const result = _.circularShift(arr, 9)
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
  test('should return empty array', () => {
    const results = _.circularShift([], 0)
    expect(results).toEqual([])
  })
  test('should return empty array', () => {
    const results = _.circularShift([], 10)
    expect(results).toEqual([])
  })
})
