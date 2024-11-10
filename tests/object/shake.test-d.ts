import { shake } from 'radashi'

describe('shake', () => {
  test('object with possibly undefined values', () => {
    // Undefined values are removed.
    const result = shake({} as { a: string | undefined })
    expectTypeOf(result).toEqualTypeOf<{ a: string }>()
  })

  test('object with optional properties', () => {
    // Optional properties must not be affected, because we don't know
    // whether they exist on the object at runtime.
    const result = shake({} as { a?: string })
    expectTypeOf(result).toEqualTypeOf<{ a?: string }>()

    // When using exactOptionalPropertyTypes, optional properties
    // *will* have their undefined values removed, but their
    // optionality still won't be affected.
    const result2 = shake({} as { a?: string | undefined }, undefined)
    expectTypeOf(result2).toEqualTypeOf<{ a?: string }>()
  })

  test('Record type', () => {
    // Undefined values are removed.
    const result = shake({} as Record<string, string | undefined>)
    expectTypeOf(result).toEqualTypeOf<Record<string, string>>()

    // Allows any property key. Preserves null values.
    const result2 = shake({} as Record<keyof any, string | null | undefined>)
    expectTypeOf(result2).toEqualTypeOf<Record<keyof any, string | null>>()
  })

  test('with filter function', () => {
    // We cannot assume *anything* about the return type when a filter
    // function is used. You can use type assertions to “fix” the
    // return type in this case.
    const result = shake({} as { a: string | undefined }, value => {
      // We cannot assume *anything* about the value parameter,
      // since “object assignability” is not strict in TypeScript.
      expectTypeOf(value).toEqualTypeOf<unknown>()

      return value === undefined
    })
    expectTypeOf(result).toEqualTypeOf<{ a: string | undefined }>()
  })
})
