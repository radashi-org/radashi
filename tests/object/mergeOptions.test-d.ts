import * as _ from 'radashi'

type A = { x: number; y?: string }
type B = { y: string; z: boolean }
type C = { y?: string; z: boolean }

declare const maybeA: A | undefined
declare const maybeB: B | undefined

class Character {
  constructor(
    public name: string,
    public age: number,
  ) {}
}

describe('mergeOptions', () => {
  it('merge two plain objects', () => {
    const a: A = { x: 1, y: 'ok' }
    const b: B = { y: 'override', z: true }

    const m = _.mergeOptions(a, b)

    expectTypeOf(m).toEqualTypeOf<{ x: number; y: string; z: boolean }>()
  })

  it('preserves optional when overlapping key in A', () => {
    const a: A = { x: 1, y: 'ok' }
    const c: C = { z: true }

    const m = _.mergeOptions(a, c)

    expectTypeOf(m).toEqualTypeOf<{
      x: number
      y?: string
      z: boolean
    }>()
  })

  it('A undefined ⇒ result = B widened', () => {
    const b: B = { y: 'hi', z: false }

    const m = _.mergeOptions(undefined, b)

    expectTypeOf(m).toEqualTypeOf<{ y: string; z: boolean }>()
  })

  it('B undefined ⇒ result = A widened', () => {
    const a: A = { x: 42 }

    const m = _.mergeOptions(a, undefined)

    expectTypeOf(m).toEqualTypeOf<{ x: number; y?: string }>()
  })

  it('both undefined ⇒ result = undefined', () => {
    const m = _.mergeOptions(undefined, undefined)

    expectTypeOf(m).toBeUndefined()
  })

  it('preserve optional when A has optional key', () => {
    type A2 = { p?: string }

    const m1 = _.mergeOptions({ p: 'ok' } as A2, {})
    const m2 = _.mergeOptions(undefined, {})

    expectTypeOf(m1).toEqualTypeOf<{ p?: string }>()
    // biome-ignore lint/complexity/noBannedTypes:
    expectTypeOf(m2).toEqualTypeOf<{}>()
  })

  it('merges class instance and plain object', () => {
    const anderson = new Character('Thomas Anderson', 49)
    const neo = { name: 'Neo', alias: 'The One' }

    const merged = _.mergeOptions(anderson, neo)
    expectTypeOf(merged).toEqualTypeOf<{
      name: string
      alias: string
      age: number
    }>()
  })

  it('merges overlapping optional property with required property', () => {
    type B2 = { b?: string }
    const merged = _.mergeOptions({ b: 9 }, {} as B2)

    expectTypeOf(merged).toEqualTypeOf<{ b: number | string }>()
  })

  it('preserves runtime branches when both inputs may be undefined', () => {
    const merged = _.mergeOptions(maybeA, maybeB)

    expectTypeOf(merged).toEqualTypeOf<
      | undefined
      | { x: number; y?: string }
      | { y: string; z: boolean }
      | { x: number; y: string; z: boolean }
    >()
  })

  it('preserves undefined in required override values', () => {
    const merged = _.mergeOptions({ b: 9 }, {} as { b: string | undefined })

    expectTypeOf(merged).toEqualTypeOf<{ b: string | undefined }>()
  })

  it('preserves optional properties when both sides are optional', () => {
    const merged = _.mergeOptions({} as { a?: number }, {} as { a?: string })

    expectTypeOf(merged).toEqualTypeOf<{ a?: number | string }>()
  })
})
