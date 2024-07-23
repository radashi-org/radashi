import * as _ from 'radashi'
import { bench } from 'vitest'

describe('similarity', () => {
  const string1 = 'h'.repeat(100)
  const string2 = 'ha'.repeat(50)

  bench('with 50% similar characters', () => {
    _.similarity(string1, string2)
  })
})
