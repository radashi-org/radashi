import * as _ from 'radashi'
import { bench, describe } from 'vitest'

describe('isPromiseLike', () => {
  bench('with Promise', () => {
    _.isPromiseLike(new Promise(res => res(0)))
  })

  bench('with Promise-like', () => {
    _.isPromiseLike({
      // biome-ignore lint/suspicious/noThenProperty:
      then: () => {},
    })
  })

  bench('with non-Promise', () => {
    _.isPromiseLike(22)
  })
})
