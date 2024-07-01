import * as _ from 'radashi'
import { bench } from 'vitest'

describe('intersects', () => {
  bench('with mixed arrays', () => {
    const listA = ['a', 'b']
    const listB = [1, 2, 'b', 'x']
    _.intersects(listA, listB)
  })

  bench('with no common items', () => {
    const listA = ['a', 'b', 'c']
    const listB = ['x', 'y']
    _.intersects(listA, listB)
  })

  bench('with custom identity function', () => {
    const listA = [{ value: 23 }, { value: 12 }]
    const listB = [{ value: 12 }]
    _.intersects(listA, listB, x => x.value)
  })

  bench('with object arrays', () => {
    const obj1 = { id: 1 }
    const obj2 = { id: 2 }
    const obj3 = { id: 3 }

    _.intersects([obj1, obj2], [obj2, obj3])
    _.intersects([obj1], [obj3])
  })
})
