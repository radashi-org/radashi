import * as _ from 'radashi'
import { bench } from 'vitest'

describe('list', () => {
  bench('with default step', () => {
    _.list(0, 4)
  })

  bench('with custom step', () => {
    _.list(0, 6, i => i, 2)
  })

  bench('with string fill', () => {
    _.list(0, 3, 'y')
  })

  bench('with function fill', () => {
    _.list(0, 3, i => `y${i}`)
  })

  bench('with object fill', () => {
    const obj = { name: 'radashi' }
    _.list(0, 3, obj)
  })
})
