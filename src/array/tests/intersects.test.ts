import * as _ from 'radashi'

const cast = <T = unknown[]>(value: any): T => value

describe('intersects function', () => {
  test('returns true if list a & b have items in common', () => {
    const listA = ['a', 'b']
    const listB = [1, 2, 'b', 'x']
    const result = _.intersects(listA, listB)
    expect(result).toBeTruthy()
  })
  test('returns false if list a & b have no items in common', () => {
    const listA = ['a', 'b', 'c']
    const listB = ['x', 'y']
    const result = _.intersects(listA, listB)
    expect(result).toBeFalsy()
  })
  test('returns true using custom identity', () => {
    const listA = [{ value: 23 }, { value: 12 }]
    const listB = [{ value: 12 }]
    const result = _.intersects(listA, listB, x => x.value)
    expect(result).toBeTruthy()
  })
  test('returns false without failing if either list is null', () => {
    expect(_.intersects(cast(null), [])).toBeFalsy()
    expect(_.intersects([], cast(null))).toBeFalsy()
  })
})
