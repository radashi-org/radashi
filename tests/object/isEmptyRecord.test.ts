import { isEmptyRecord } from 'radashi'
import { describe, expect, test } from 'vitest'

describe('isEmptyRecord', () => {
  test('returns true for an empty object', () => {
    expect(isEmptyRecord({})).toBe(true)
  })

  test('returns false for an object with own properties', () => {
    expect(isEmptyRecord({ a: 1 })).toBe(false)
    expect(isEmptyRecord({ a: 1, b: 2 })).toBe(false)
  })

  test('returns true for an object with no own properties but inherited properties', () => {
    const parent = { a: 1 }
    const child = Object.create(parent)
    expect(isEmptyRecord(child)).toBe(true)
  })
})
