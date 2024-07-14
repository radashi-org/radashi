import * as _ from 'radashi'
import { bench } from 'vitest'

describe('mapEntriesToArray', () => {
  bench('with empty object', () => {
    _.mapEntriesToArray({} as Record<string, string>, () => 1)
  })

  bench('with non-empty object', () => {
    const obj = {
      one: { name: 'ray' },
      two: { name: 'ash' },
    }
    _.mapEntriesToArray(obj, (key, value) => ({
      index: key,
      name: value.name,
    }))
  })
})
