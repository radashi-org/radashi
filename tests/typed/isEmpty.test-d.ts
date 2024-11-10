import type { ToEmptyAble } from 'radashi'
import * as _ from 'radashi'

describe('isEmpty type guard', () => {
  test('string', () => {
    const value = {} as string

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<''>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })

  test('array', () => {
    const value = [] as string[]

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<never[]>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string[]>()
    }
  })

  test('readonly array', () => {
    const value = [] as readonly string[]

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<readonly never[]>()
    } else {
      expectTypeOf(value).toEqualTypeOf<readonly string[]>()
    }
  })

  test('number', () => {
    const value = {} as number

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<0>()
    } else {
      expectTypeOf(value).toEqualTypeOf<number>()
    }
  })

  test('boolean', () => {
    const value = {} as boolean

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<false>()
    } else {
      expectTypeOf(value).toEqualTypeOf<true>()
    }
  })

  test('kitchen sink', () => {
    const value = {} as ToEmptyAble

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<
        0 | '' | false | readonly never[] | null | undefined
      >()
    } else {
      expectTypeOf(value).toEqualTypeOf<
        // biome-ignore lint/complexity/noBannedTypes:
        true | number | string | readonly any[] | symbol | Function
      >()
    }
  })

  /**
   * Some types are marked as "never empty", which means `isEmpty`
   * will always return false for them.
   */
  test('never empty types', () => {
    const value = {} as symbol | (() => any) | null | undefined

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<null | undefined>()
    } else {
      expectTypeOf(value).toEqualTypeOf<symbol | (() => any)>()
    }
  })

  /**
   * Object types that are *not* assignable to the `ToEmptyAble` type
   * will disable the type guard entirely. This is an unavoidable
   * limitation of TypeScript.
   */
  test('incompatible types', () => {
    const value = {} as Date | null | undefined

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<Date | null | undefined>()
    } else {
      expectTypeOf(value).toEqualTypeOf<Date | null | undefined>()
    }
  })

  test('any', () => {
    const value = {} as any

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<
        false | '' | 0 | readonly never[] | never[] | null | undefined
      >()
    } else {
      expectTypeOf(value).toEqualTypeOf<any>()
    }
  })

  test('unknown', () => {
    const value = {} as unknown

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<unknown>()
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>()
    }
  })
})
