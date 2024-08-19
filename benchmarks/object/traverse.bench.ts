import * as _ from 'radashi'

describe('traverse', () => {
  const root = {
    a: { b: { c: { d: { e: 1 } } } },
  }
  bench('basic traversal', () => {
    _.traverse(root, () => {})
  })
})
