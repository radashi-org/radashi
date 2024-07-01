import * as _ from 'radashi'

const cast = <T = object>(value: any): T => value

describe('mapEntries', () => {
  const peopleByRole = {
    admin: 'jay',
    user: 'fey',
    guest: 'bray',
  }
  test('handles null input', () => {
    const result = _.mapEntries(
      cast(null),
      cast<(key: never, value: never) => [string | number | symbol, unknown]>(
        null,
      ),
    )
    expect(result).toEqual({})
  })
  test('correctly maps keys and values', () => {
    const result = _.mapEntries(peopleByRole, (key, value) => [
      value,
      key.toUpperCase(),
    ])
    expect(result.jay).toBe('ADMIN')
    expect(result.fey).toBe('USER')
    expect(result.bray).toBe('GUEST')
  })
})
