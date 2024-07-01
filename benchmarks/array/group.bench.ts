import * as _ from 'radashi'
import { bench } from 'vitest'

describe('group', () => {
  bench('with groups by provided attribute', () => {
    const list = [
      { group: 'a', word: 'hello' },
      { group: 'b', word: 'bye' },
      { group: 'a', word: 'oh' },
      { group: 'b', word: 'hey' },
      { group: 'c', word: 'ok' },
    ]
    _.group(list, x => x.group)
  })
})
