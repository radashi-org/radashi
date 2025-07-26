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

  bench('with long arrays', () => {
    const inputA = Array.from({ length: 10_000 }, (_, i) => ({
      name: `a-${i}`,
      id: i,
    }))
    const inputB = Array.from({ length: 10_000 }, (_, i) => ({
      name: `b-${i}`,
      id: i,
    }))

    _.merge(inputA, inputB, x => x.id)
  })
})
