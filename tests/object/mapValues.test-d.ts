import { mapValues } from 'radashi'

describe('mapValues', () => {
  test('Record types', () => {
    const object = mapValues({} as Record<string, number>, x => x.toFixed(2))
    expectTypeOf(object).toEqualTypeOf<Record<string, string>>()
  })

  test('index signature types', () => {
    const object = mapValues({} as { [key: string]: number }, x => x.toFixed(2))
    expectTypeOf(object).toEqualTypeOf<{ [key: string]: string }>()
  })

  test('literal types', () => {
    const object = mapValues({} as { a: number }, x => x.toFixed(2))
    expectTypeOf(object).toEqualTypeOf<{ a: string }>()
  })

  test('optional types', () => {
    const object = mapValues({} as { a?: number }, x => {
      // Due to exactOptionalPropertyTypes, the type-checker knows
      // that `x` will never be undefined, because `mapValues` can
      // only process keys that are present.
      expectTypeOf(x).toEqualTypeOf<number>()
      return x.toFixed(2)
    })
    expectTypeOf(object).toEqualTypeOf<{ a?: string }>()
  })
})
