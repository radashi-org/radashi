import * as _ from 'radashi'

type A = { x: number; y?: string } | undefined
type B = { y: string; z: boolean } | undefined
type C = { y?: string; z: boolean } | undefined

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

    expectTypeOf(m).toMatchObjectType<{ x: number; y: string; z: boolean }>()
  })

  it('preserves optional when overlapping key in A', () => {
    const a: A = { x: 1, y: 'ok' }
    const c: C = { y: 'override', z: true }

    const m = _.mergeOptions(a, c)

    expectTypeOf(m).toMatchObjectType<{
      x: number
      y: string | undefined
      z: boolean
    }>()
  })

  it('A undefined ⇒ result = B widened', () => {
    const b: B = { y: 'hi', z: false }

    const m = _.mergeOptions(undefined, b)

    expectTypeOf(m).toMatchObjectType<{ y: string; z: boolean }>()
  })

  it('B undefined ⇒ result = A widened', () => {
    const a: A = { x: 42 }

    const m = _.mergeOptions(a, undefined)

    expectTypeOf(m).toMatchObjectType<{ x: number; y?: string }>()
  })

  it('both undefined ⇒ result = undefined', () => {
    const m = _.mergeOptions(undefined, undefined)

    expectTypeOf(m).toBeUndefined()
  })

  it('preserve optional when A has optional key', () => {
    type A2 = { p?: string } | undefined

    const m1 = _.mergeOptions({ p: 'ok' } satisfies A2, {})
    const m2 = _.mergeOptions(undefined, {})

    expectTypeOf(m1).toMatchTypeOf<{ p: string | undefined }>()
    // biome-ignore lint/complexity/noBannedTypes:
    expectTypeOf(m2).toMatchObjectType<{}>()
  })

  it('merges class instance and plain object', () => {
    const anderson = new Character('Thomas Anderson', 49)
    const neo = { name: 'Neo', alias: 'The One' }

    const merged = _.mergeOptions(anderson, neo)
    expectTypeOf(merged).toMatchObjectType<{
      name: string
      alias: string
      age: number
    }>()
  })
})
