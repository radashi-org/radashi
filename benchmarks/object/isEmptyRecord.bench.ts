import { isEmptyRecord } from 'radashi'
import { bench, describe } from 'vitest'

describe('isEmptyRecord', () => {
  bench('empty object', () => {
    isEmptyRecord({})
  })

  bench('object with one property', () => {
    isEmptyRecord({ a: 1 })
  })

  bench('object with multiple properties', () => {
    isEmptyRecord({ a: 1, b: 2, c: 3 })
  })
})

describe('Object.keys comparison', () => {
  bench('empty object', () => {
    Object.keys({}).length === 0
  })

  bench('object with one property', () => {
    Object.keys({ a: 1 }).length === 0
  })
})
