import * as _ from 'radashi'
import { bench } from 'vitest'

describe('traverse', () => {
  const root = {
    a: { b: { c: { d: { e: 1 } } } },
  }
  bench('basic traversal', () => {
    _.traverse(root, () => {})
  })
})
