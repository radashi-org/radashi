import { mapValues } from 'radashi'

describe('mapValues', () => {
  test('Record types', () => {
    const object = mapValues({} as Record<string, number>, x => String(x))
    expectTypeOf(object).toEqualTypeOf<Record<string, string>>()
  })

  test('index signature types', () => {
    const object = mapValues({} as { [key: string]: number }, x => String(x))
    expectTypeOf(object).toEqualTypeOf<{ [key: string]: string }>()
  })

  test('literal types', () => {
    const object = mapValues({} as { a: number }, x => String(x))
    expectTypeOf(object).toEqualTypeOf<{ a: string }>()
  })

  test('optional types', () => {
    const object = mapValues({} as { a?: number }, x => String(x))
    expectTypeOf(object).toEqualTypeOf<{ a?: string }>()
  })
})
