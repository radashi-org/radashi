import * as _ from 'radashi'

describe('castRecord return type', () => {
  test('value is unknown', () => {
    const value = {} as unknown

    expectTypeOf(_.castRecord(value)).toEqualTypeOf<Record<PropertyKey, unknown>>()
  })

  test('value is a known object shape', () => {
    const value = { name: 'Radashi' }

    expectTypeOf(_.castRecord(value)).toEqualTypeOf<Record<PropertyKey, unknown>>()
  })
})
