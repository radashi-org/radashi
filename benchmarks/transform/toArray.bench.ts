import * as _ from 'radashi'
import { bench } from 'vitest'

describe('toArray', () => {
  bench('with empty object', () => {
    _.toArray({} as Record<string, string>, () => 1)
  })

  bench('with non-empty object', () => {
    const obj = {
      one: { name: 'ray' },
      two: { name: 'ash' },
    }
    _.toArray(obj, (key, value) => ({
      index: key,
      name: value.name,
    }))
  })
})
