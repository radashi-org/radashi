import * as _ from 'radashi'
import { bench } from 'vitest'

describe('fork', () => {
  bench('with empty array', () => {
    _.fork([], x => !!x)
  })

  bench('with non-empty array', () => {
    const input = [
      { name: 'ray', group: 'X' },
      { name: 'sara', group: 'X' },
      { name: 'bo', group: 'Y' },
      { name: 'mary', group: 'Y' },
    ]
    _.fork(input, x => x.group === 'X')
  })
})
