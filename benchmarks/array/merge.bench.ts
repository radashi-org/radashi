import * as _ from 'radashi'

describe('merge', () => {
  bench('with two empty array inputs', () => {
    _.merge([], [], _ => '')
  })

  bench('with complex inputs', () => {
    const inputA = [
      { name: 'ray', group: 'X' },
      { name: 'sara', group: 'X' },
      { name: 'bo', group: 'Y' },
      { name: 'mary', group: 'Y' },
    ]
    const inputB = [
      { name: 'ray', group: 'XXX' },
      { name: 'mary', group: 'YYY' },
    ]
    _.merge(inputA, inputB, x => x.name)
  })
})
