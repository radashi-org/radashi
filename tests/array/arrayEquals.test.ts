/** biome-ignore-all lint/suspicious/noSparseArray: */
import * as _ from 'radashi'

describe('arrayEquals', () => {
  test('returns true for equal arrays', () => {
    expect(_.arrayEquals([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  test('returns false for arrays with different lengths', () => {
    expect(_.arrayEquals([1, 2], [1, 2, 3])).toBe(false)
    expect(_.arrayEquals([1, 2, 3], [1, 2])).toBe(false)
  })

  test('returns false for arrays with different content', () => {
    expect(_.arrayEquals([1, 2, 3], [1, 2, 4])).toBe(false)
    expect(_.arrayEquals(['a', 'b'], ['a', 'c'])).toBe(false)
  })

  test('returns true for two empty arrays', () => {
    expect(_.arrayEquals([], [])).toBe(true)
  })

  test('handles NaN correctly', () => {
    expect(_.arrayEquals([Number.NaN], [Number.NaN])).toBe(true)
    expect(_.arrayEquals([Number.NaN, 1], [Number.NaN, 1])).toBe(true)
    expect(_.arrayEquals([Number.NaN, 1], [1, Number.NaN])).toBe(false)
  })

  test('handles +0 and -0 correctly', () => {
    expect(_.arrayEquals([0], [-0])).toBe(false)
    expect(_.arrayEquals([-0], [0])).toBe(false)
    expect(_.arrayEquals([0, 1], [-0, 1])).toBe(false)
  })

  test('handles object references', () => {
    const obj1 = { a: 1 }
    const obj2 = { a: 1 }
    expect(_.arrayEquals([obj1], [obj1])).toBe(true)
    expect(_.arrayEquals([obj1], [obj2])).toBe(false) // Different references
  })

  test('handles mixed types', () => {
    expect(_.arrayEquals([1, 'a', null], [1, 'a', null])).toBe(true)
    expect(_.arrayEquals([1, 'a', null], [1, 'a', undefined])).toBe(false)
  })

  test('handles sparse arrays', () => {
    const a = [1, , 3] // a[1] is a hole (undefined)
    const b = [1, undefined, 3]
    const c = [1, , 3] // another sparse array with a hole at index 1

    expect(_.arrayEquals(a, b)).toBe(true) // holes and undefined are treated the same by Object.is
    expect(_.arrayEquals(a, c)).toBe(true)
    expect(_.arrayEquals([,], [undefined])).toBe(true)
    expect(_.arrayEquals([,], [])).toBe(false)
    expect(_.arrayEquals([1, , 3], [1, 3])).toBe(false)
  })
})
