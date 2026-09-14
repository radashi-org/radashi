import * as _ from 'radashi'

const cast = <T = number[]>(value: any): T => value

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
  test('counts identities that collide with Object.prototype keys', () => {
    const result = _.counting(
      ['toString', 'toString', 'constructor', 'x'],
      x => x,
    )
    expect(result).toEqual({
      toString: 2,
      constructor: 1,
      x: 1,
    })
  })
  test('does not error on bad input', () => {
    expect(() => _.counting(cast(null), x => x)).not.toThrow()
    expect(() => _.counting(cast(undefined), x => x)).not.toThrow()
  })
})
