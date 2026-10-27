import * as _ from 'radashi'

type IsExact<TActual, TExpected> = (<T>() => T extends TActual
  ? 1
  : 2) extends <T>() => T extends TExpected ? 1 : 2
  ? (<T>() => T extends TExpected ? 1 : 2) extends <T>() => T extends TActual
      ? 1
      : 2
    ? true
    : false
  : false

type Expect<T extends true> = T

describe('sort types', () => {
  test('keeps array type', () => {
    const list = [2, 0, 1]

    const result = _.sort(list)

    expectTypeOf(result).toEqualTypeOf<number[]>()
  })

  test('returns mutable array from readonly array', () => {
    const list: readonly number[] = [2, 0, 1]

    const result = _.sort(list)

    expectTypeOf(result).toEqualTypeOf<number[]>()
  })

  test('keeps tuple type', () => {
    const list = [{ index: 2 }, { index: 0 }, { index: 1 }] as const

    const result = _.sort(list, i => i.index)

    expectTypeOf(result).toEqualTypeOf<
      [(typeof list)[number], (typeof list)[number], (typeof list)[number]]
    >()
  })

  test('widens rest tuple elements', () => {
    type Result = _.SortArray<[number, ...string[]]>
    type Expected = [number | string, ...(number | string)[]]

    const result: Result = [1, 2]

    expectTypeOf(result).toEqualTypeOf<Result>()
    expectTypeOf<Result>().toEqualTypeOf<Expected>()
    type _ = Expect<IsExact<Result, Expected>>
  })
})
