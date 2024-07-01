import * as _ from 'radashi'
import { bench, describe } from 'vitest'

describe('isPromise', () => {
  bench('with Promise', () => {
    _.isPromise(new Promise(res => res(0)))
  })

  bench('with Promise-like', () => {
    _.isPromise({
      // biome-ignore lint/suspicious/noThenProperty:
      then: () => {},
    })
  })

  bench('with non-Promise', () => {
    _.isPromise(22)
  })
})
