import * as _ from 'radashi'

describe('invert', () => {
  test('correctly maps keys and values', () => {
    const peopleByRole = {
      admin: 'jay',
      user: 'fey',
      guest: 'bray',
    }
    const result = _.invert(peopleByRole)
    expect(result.jay).toBe('admin')
    expect(result.fey).toBe('user')
    expect(result.bray).toBe('guest')
  })
})
