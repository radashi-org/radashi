import * as _ from 'radashi'

const cast = <T = number[]>(value: any): T => value

describe('counting function', () => {
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
  test('does not error on bad input', () => {
    expect(() => _.counting(cast(null), x => x)).not.toThrow()
    expect(() => _.counting(cast(undefined), x => x)).not.toThrow()
  })
})
