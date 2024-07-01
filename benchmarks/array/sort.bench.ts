import * as _ from 'radashi'
import { bench } from 'vitest'

describe('sort', () => {
  bench('with ascending order', () => {
    const list = [{ index: 2 }, { index: 0 }, { index: 1 }]
    _.sort(list, i => i.index)
  })

  bench('with descending order', () => {
    const list = [{ index: 2 }, { index: 0 }, { index: 1 }]
    _.sort(list, i => i.index, true)
  })
})
