import * as _ from 'radashi'

describe('toFloat', () => {
  test('handles null', () => {
    const result = _.toFloat(null)
    expect(result).toBe(0.0)
  })
  test('handles undefined', () => {
    const result = _.toFloat(undefined)
    expect(result).toBe(0.0)
  })
  test('uses null default', () => {
    const result = _.toFloat('x', null)
    expect(result).toBeNull()
  })
  test('handles bad input', () => {
    const result = _.toFloat({})
    expect(result).toBe(0.0)
  })
  test('converts 20.00 correctly', () => {
    const result = _.toFloat('20.00')
    expect(result).toBe(20.0)
  })
})
