import * as _ from 'radashi'

describe('castRecord', () => {
  test('returns the input when it is an object', () => {
    const input = { a: 1 }

    expect(_.castRecord(input)).toBe(input)
  })

  test('returns an empty object when the input is not an object', () => {
    expect(_.castRecord(null)).toEqual({})
    expect(_.castRecord(undefined)).toEqual({})
    expect(_.castRecord('value')).toEqual({})
    expect(_.castRecord([])).toEqual({})
  })
})
