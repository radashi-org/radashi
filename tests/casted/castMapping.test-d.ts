import * as _ from 'radashi'

describe('castMapping', () => {
  test('function input', () => {
    const fn = (arg: number) => arg * 2

    expectTypeOf(_.castMapping(fn)).toEqualTypeOf<
      _.MappingFunction<typeof fn>
    >()

    expectTypeOf(_.castMapping(fn)).toEqualTypeOf<
      <TInput extends _.MappedInput<typeof fn>>(
        input: TInput,
      ) => _.MappedOutput<typeof fn, TInput>
    >()

    expectTypeOf(_.castMapping(fn)).toEqualTypeOf<
      <TInput extends number>(
        input: TInput,
      ) => _.MappedOutput<typeof fn, TInput>
    >()

    expectTypeOf(_.castMapping(fn)<number>).toEqualTypeOf<
      (input: number) => number
    >()

    expectTypeOf(_.castMapping(fn)(1)).toEqualTypeOf<number>()
  })

  test('generic function input', () => {
    const fn = <T extends object>(arg: T): [T, boolean] => [
      arg,
      _.isPlainObject(arg),
    ]

    expectTypeOf(_.castMapping(fn)).toEqualTypeOf<
      _.MappingFunction<typeof fn>
    >()

    expectTypeOf(_.castMapping(fn)).toEqualTypeOf<
      <TInput extends _.MappedInput<typeof fn>>(
        input: TInput,
      ) => _.MappedOutput<typeof fn, TInput>
    >()

    expectTypeOf(_.castMapping(fn)).toEqualTypeOf<
      <TInput extends object>(
        input: TInput,
      ) => _.MappedOutput<typeof fn, TInput>
    >()

    expectTypeOf(_.castMapping(fn<Date>)(new Date())).toEqualTypeOf<
      [Date, boolean]
    >()
  })

  test('property input', () => {
    expectTypeOf(_.castMapping('a')).toEqualTypeOf<_.MappingFunction<'a'>>()

    expectTypeOf(_.castMapping('a')).toEqualTypeOf<
      <TInput extends _.MappedInput<'a'>>(
        input: TInput,
      ) => _.MappedOutput<'a', TInput>
    >()

    expectTypeOf(_.castMapping('a')<{ a: number }>).toEqualTypeOf<
      (input: { a: number }) => number
    >()

    expectTypeOf(
      _.castMapping('a')<{ a: number } | { a: string }>,
    ).toEqualTypeOf<(input: { a: number } | { a: string }) => number | string>()

    expectTypeOf(_.castMapping('a')({ a: 1 })).toEqualTypeOf<number>()
  })

  test('nullish input', () => {
    const nullish = null as null | undefined

    expectTypeOf(_.castMapping(nullish)).toEqualTypeOf<
      _.MappingFunction<typeof nullish>
    >()

    expectTypeOf(_.castMapping(nullish)).toEqualTypeOf<
      <TInput extends _.MappedInput<typeof nullish>>(
        input: TInput,
      ) => _.MappedOutput<typeof nullish, TInput>
    >()

    expectTypeOf(_.castMapping(nullish)<{ a: number }>).toEqualTypeOf<
      (input: { a: number }) => typeof input
    >()

    expectTypeOf(_.castMapping(nullish)({ a: 1 })).toEqualTypeOf<{
      a: number
    }>()
  })
})
