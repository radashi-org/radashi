import * as _ from 'radashi'
import { bench } from 'vitest'

describe('asyncPushable', () => {
  bench('with no arguments', () => {
    _.asyncPushable()
  })
})
