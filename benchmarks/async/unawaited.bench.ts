import * as _ from 'radashi'
import { bench } from 'vitest'

describe('unawaited', () => {
  const promise = Promise.resolve()
  bench('unawaited', () => {
    _.unawaited(promise)
  })
})
