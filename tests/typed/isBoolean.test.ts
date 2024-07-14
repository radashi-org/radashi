import * as _ from 'radashi'

describe('isBoolean', () => {
  test('returns true for boolean primitives', () => {
    expect(_.isBoolean(true)).toBe(true)
    expect(_.isBoolean(false)).toBe(true)
  })

  test('returns false for non-boolean primitives', () => {
    expect(_.isBoolean(0)).toBe(false)
    expect(_.isBoolean(1)).toBe(false)
    expect(_.isBoolean('')).toBe(false)
    expect(_.isBoolean('true')).toBe(false)
    expect(_.isBoolean('false')).toBe(false)
    expect(_.isBoolean(null)).toBe(false)
    expect(_.isBoolean(undefined)).toBe(false)
    expect(_.isBoolean(Symbol())).toBe(false)
  })

  test('returns false for objects', () => {
    expect(_.isBoolean({})).toBe(false)
    expect(_.isBoolean([])).toBe(false)
    expect(_.isBoolean(new Date())).toBe(false)
    expect(_.isBoolean(/regex/)).toBe(false)
    expect(_.isBoolean(new Error())).toBe(false)
  })

  test('returns false for functions', () => {
    expect(_.isBoolean(() => {})).toBe(false)
  })

  test('returns false for Boolean objects', () => {
    expect(_.isBoolean(new Boolean(true))).toBe(false)
    expect(_.isBoolean(new Boolean(false))).toBe(false)
    expect(_.isBoolean(Object(true))).toBe(false)
    expect(_.isBoolean(Object(false))).toBe(false)
  })
})
