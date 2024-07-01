import * as _ from 'radashi'
import { bench } from 'vitest'

describe('sift', () => {
  bench('with non-empty array', () => {
    const people = [null, 'hello', undefined, false, 23]
    _.sift(people)
  })
})
