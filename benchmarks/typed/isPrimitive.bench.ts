import * as _ from 'radashi'
import { bench, describe } from 'vitest'

describe('isPrimitive', () => {
  bench('with primitive', () => {
    _.isPrimitive(1.1)
  })

  bench('with non-primitive', () => {
    _.isPrimitive(new Date())
  })

  bench('with null', () => {
    _.isPrimitive(null)
  })
})
