import * as _ from 'radashi'

describe('counting', () => {
  const people = [
    { name: 'ray', group: 'X' },
    { name: 'sara', group: 'X' },
    { name: 'bo', group: 'Y' },
    { name: 'mary', group: 'Y' },
  ]
  test('returns correctly counted items object', () => {
    const result = _.counting(people, p => p.group)
    expect(result).toEqual({
      X: 2,
      Y: 2,
    })
  })
})
