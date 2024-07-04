import * as _ from 'radashi'
import { bench } from 'vitest'

describe('cloneDeep', () => {
  bench('with no arguments', () => {
    _.cloneDeep()
  })
})

