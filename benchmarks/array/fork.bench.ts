import * as _ from 'radashi'

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
