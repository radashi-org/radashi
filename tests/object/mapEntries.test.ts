import * as _ from 'radashi'

describe('mapEntries', () => {
  test('correctly maps keys and values', () => {
    const peopleByRole = {
      admin: 'jay',
      user: 'fey',
      guest: 'bray',
    }
    const result = _.mapEntries(peopleByRole, (key, value) => [
      value,
      key.toUpperCase(),
    ])
    expect(result.jay).toBe('ADMIN')
    expect(result.fey).toBe('USER')
    expect(result.bray).toBe('GUEST')
  })
})
