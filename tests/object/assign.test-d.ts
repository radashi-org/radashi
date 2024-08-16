import { assign } from 'radashi'

// For testing `assign` with custom class instances.
class Data {
  constructor(public data: number) {}
}

// This declaration tells `assign` to never merge plain objects into
// our Data class.
declare module 'radashi' {
  interface CustomClassRegistry {
    Data: Data
  }
}

describe('assign', () => {
  test('assign property with native object', () => {
    const initial = {} as { a: RegExp }
    const override = {} as { a: Date }
    const result = assign(initial, override)

    expectTypeOf(result).toEqualTypeOf<{
      a: Date
    }>()
  })

  test('assign property with primitive value', () => {
    const initial = {} as { a: number }
    const override = {} as { a: string }
    const result = assign(initial, override)

    expectTypeOf(result).toEqualTypeOf<{
      a: string
    }>()
  })

  test('assign property with optional primitive value', () => {
    const initial = {} as { a: number }
    const override = {} as { a?: string }
    const result = assign(initial, override)

    expectTypeOf(result).toEqualTypeOf<{
      a: number | string | undefined
    }>()
  })

  test('assign optional property with primitive value', () => {
    const initial = {} as { a?: number }
    const override = {} as { a: string }
    const result = assign(initial, override)

    expectTypeOf(result).toEqualTypeOf<{
      a: string
    }>()
  })

  test('assign optional property with optional primitive value', () => {
    const initial = {} as { a?: number }
    const override = {} as { a?: string }
    const result = assign(initial, override)

    expectTypeOf(result).toEqualTypeOf<{
      a?: string | number
    }>()
  })

  test('assign Map property with Map', () => {
    const initial = {} as { a: Map<number, string> }
    const override = {} as { a: Map<string, string> }
    const result = assign(initial, override)

    expectTypeOf(result).toEqualTypeOf<{
      a: Map<string, string>
    }>()
  })

  describe('nested arrays', () => {
    test('assign array property with array of primitives', () => {
      const initial = {} as { a: number[] }
      const override = {} as { a: string[] }
      const result = assign(initial, override)

      expectTypeOf(result).toEqualTypeOf<{
        a: string[]
      }>()
    })

    test('assign array property with array of objects', () => {
      const initial = {} as { a: { b: number }[] }
      const override = {} as { a: { b: string }[] }
      const result = assign(initial, override)

      expectTypeOf(result).toEqualTypeOf<{
        a: { b: string }[]
      }>()
    })
  })

  describe('nested objects', () => {
    test('assign Map property with object', () => {
      const initial = {} as { a: Map<number, { b: number }> }
      const override = {} as { a: { b: string } }
      const result = assign(initial, override)

      expectTypeOf(result).toEqualTypeOf<{
        a: { b: string }
      }>()
    })

    test('assign object property with object', () => {
      const initial = {} as { a: { b: number; c: number } }
      const override = {} as { a: { b: string; b2?: string } }
      const result = assign(initial, override)

      expectTypeOf(result).toEqualTypeOf<{
        a: { b: string; b2?: string; c: number }
      }>()
    })

    test('assign optional object property with object', () => {
      const initial = {} as { a?: { b: number; c: number } | null | undefined }
      const override = {} as { a: { b: string } }
      const result = assign(initial, override)

      // Since the initial "a" property is optional, there exist two
      // possible object types for "a" in the result type; one with "c"
      // and one without.
      expectTypeOf(result).toEqualTypeOf<{
        a: { b: string; c: number } | { b: string }
      }>()
    })

    test('assign object property with optional object and optional properties', () => {
      const initial = {} as { a: { b: number; c: number } }
      const override = {} as { a?: { b?: string } }
      const result = assign(initial, override)

      // When "exactOptionalPropertyTypes" is undefined or false in the
      // tsconfig, we can't be sure if an optional property is actually
      // omitted or if its value was set to undefined. For that reason,
      // the resulting "a" property type must contain an `undefined`
      // type.
      expectTypeOf(result).toEqualTypeOf<{
        a: { b: string | number | undefined; c: number } | undefined
      }>()
    })

    test('deep object property', () => {
      const initial = {} as { a: { b: { c: number; d: number } } }
      const override = {} as { a: { b: { c: string }; x: string } }
      const result = assign(initial, override)

      expectTypeOf(result).toEqualTypeOf<{
        a: { b: { c: string; d: number }; x: string }
      }>()
    })
  })

  describe('nested class instances', () => {
    test('override instance with instance', () => {
      const initial = {} as { a: Data; c?: number }
      const override = {} as { a: Data; b: string }
      // Note: "Data" should be the type, not "{ data: number }"
      const result = assign(initial, override)

      expectTypeOf(result).toEqualTypeOf<{
        a: Data
        b: string
        c?: number
      }>()
    })

    // This relies on the fact that we registered Data with the
    // CustomClassRegistry type.
    test('override instance with object', () => {
      const initial = {} as { a: Data }
      const override = {} as { a: { b: string } }
      const result = assign(initial, override)

      expectTypeOf(result).toEqualTypeOf<{
        a: { b: string }
      }>()
    })

    // This relies on the fact that we registered Data with the
    // CustomClassRegistry type.
    test('override object with instance', () => {
      const initial = {} as { a: { b: string } }
      const override = {} as { a: Data }
      const result = assign(initial, override)

      expectTypeOf(result).toEqualTypeOf<{
        a: Data
      }>()
    })
  })
})
