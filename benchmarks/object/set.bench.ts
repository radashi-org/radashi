import * as _ from 'radashi'
import { bench } from 'vitest'

describe('set', () => {
  bench('with simple path', () => {
    _.set({}, 'foo', 0)
  })

  bench('with deep path', () => {
    _.set({}, 'cards.value', 2)
  })

  bench('with array index path', () => {
    _.set({}, 'cards.0.value', 2)
  })

  bench('with numeric key', () => {
    _.set({}, 'cards.0value', 2)
  })
})
