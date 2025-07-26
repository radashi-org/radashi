import * as _ from 'radashi'

describe('counting', () => {
  bench('with valid input', () => {
    const people = [
      { name: 'ray', group: 'X' },
      { name: 'sara', group: 'X' },
      { name: 'bo', group: 'Y' },
      { name: 'mary', group: 'Y' },
    ]
    _.counting(people, p => p.group)
  })
})
