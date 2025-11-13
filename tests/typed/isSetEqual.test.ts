import * as _ from 'radashi'

describe('isSetEqual', () => {
  test('returns true for equal sets', () => {
    expect(_.isSetEqual(new Set([1, 2, 3]), new Set([3, 2, 1]))).toBe(true)
  })

  test('returns false for sets with different entries', () => {
    expect(_.isSetEqual(new Set([1, 2, 3]), new Set([1, 2, 4]))).toBe(false)
  })

  test('returns false for sets with different sizes', () => {
    expect(_.isSetEqual(new Set([1, 2, 3]), new Set([1, 2, 3, 4]))).toBe(false)
  })

  test('deep equality is not checked', () => {
    const object1 = { a: 1 }
    const object2 = { ...object1 }

    const set1 = new Set([object1])
    const set2 = new Set([object2])

    expect(_.isSetEqual(set1, set2)).toBe(false)
  })
})
