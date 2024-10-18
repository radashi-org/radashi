import * as _ from 'radashi'

const cast = <T = any>(value: any): T => value

describe('omit', () => {
  const person = {
    name: 'jay',
    age: 20,
    active: true,
  }
  test('handles null input', () => {
    const result = _.omit(null, [])
    expect(result).toEqual({})
  })
  test('handles empty keys', () => {
    const result = _.omit(person, [])
    expect(result).toEqual(person)
  })
  test('handles null keys', () => {
    const result = _.omit(person, cast(null))
    expect(result).toEqual(person)
  })
  test('returns object without omitted properties', () => {
    const result = _.omit(person, ['name'] )
    expect(result).toEqual({
      age: 20,
      active: true,
    })
  })
  test('returns object without omitted properties when keys are readonly', () => {
    const keysToOmit = ['name', 'age'] as const;
    const result = _.omit(person, keysToOmit)
    expect(result).toEqual({
      active: true,
    })
  })
})
