import * as _ from 'radashi'

describe('tap', () => {
  bench('executing a side-effect function on a single object', () => {
    const obj = { a: 1 }
    _.tap(obj, value => {
      value.a += 1
    })
  })

  bench('executing a side-effect function on a large array', () => {
    const largeArray = Array(1000)
      .fill(null)
      .map((_, idx) => ({ id: idx, value: idx * 2 }))
    _.tap(largeArray, array => {
      array.forEach(item => (item.value += 1))
    })
  })

  bench('executing a side-effect function on deeply nested objects', () => {
    const nestedObj = { a: { b: { c: { d: { e: 100 } } } } }
    _.tap(nestedObj, obj => {
      obj.a.b.c.d.e += 1
    })
  })
})
