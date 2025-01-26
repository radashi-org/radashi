import * as _ from 'radashi'

describe('omit', () => {
  const person = {
    name: 'jay',
    age: 20,
    active: true,
  }
  test('handles empty keys', () => {
    const result = _.omit(person, [])
    expect(result).toEqual(person)
  })
  test('returns object without omitted properties', () => {
    const result = _.omit(person, ['name'])
    expect(result).toEqual({
      age: 20,
      active: true,
    })
  })
})
