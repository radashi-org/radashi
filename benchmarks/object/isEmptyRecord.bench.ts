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
