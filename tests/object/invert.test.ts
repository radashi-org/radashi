import * as _ from 'radashi'

const cast = <T = object>(value: any): T => value

describe('invert', () => {
  const peopleByRole = {
    admin: 'jay',
    user: 'fey',
    guest: 'bray',
  }
  test('handles null input', () => {
    const result = _.invert(cast(null))
    expect(result).toEqual({})
  })
  test('correctly maps keys and values', () => {
    const result = _.invert(peopleByRole)
    expect(result.jay).toBe('admin')
    expect(result.fey).toBe('user')
    expect(result.bray).toBe('guest')
  })
})
