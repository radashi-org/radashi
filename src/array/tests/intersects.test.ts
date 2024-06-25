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
  test('works with objects without an identity function', () => {
    const obj1 = { id: 1 }
    const obj2 = { id: 2 }
    const obj3 = { id: 3 }

    let result = _.intersects([obj1, obj2], [obj2, obj3])
    expect(result).toBeTruthy()

    result = _.intersects([obj1], [obj3])
    expect(result).toBeFalsy()
  })
})
