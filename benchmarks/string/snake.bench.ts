import * as _ from 'radashi'
import { bench } from 'vitest'

describe('snake', () => {
  bench('with valid input', () => {
    _.snake('hello world')
  })

  bench('with numbers and special characters (no split on number)', () => {
    _.snake('hello-world12_19-bye', { splitOnNumber: false })
  })
})
