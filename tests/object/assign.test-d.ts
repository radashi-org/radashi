import * as _ from 'radashi'
import { expectTypeOf } from 'vitest'

describe('assign types', () => {
  test('should return merged types', () => {
    const obj = _.assign({ a: 1, b: '2', c: true }, { d: 4, e: '5' })
    expectTypeOf(obj).toMatchTypeOf<{
      a: number
      b: string
      c: boolean
      d: number
      e: string
    }>()
  })

  test('should return merged types with nested objects', () => {
    const initial = {
      a: {
        b: 'c',
      },
    }
    const override = {
      a: {
        c: 'e',
      },
      d: '2',
    }

    const obj = _.assign(initial, override)

    expectTypeOf(obj).toEqualTypeOf<{
      a: { b: string; c: string }
      d: string
    }>()
  })

  test('should override types', () => {
    const initial = {
      a: 1,
      b: '2',
      c: true,
    }
    const override = {
      a: true,
      b: 2,
      c: { d: 4 },
    }

    const obj = _.assign(initial, override)

    expectTypeOf(obj).toEqualTypeOf<{
      a: boolean
      b: number
      c: { d: number }
    }>()
  })
})
