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
    expect(m).toEqual({ x: 1, y: 'override', z: true })
  })

  it('preserves optional when overlapping key in A', () => {
    const a: A = { x: 1, y: 'ok' }
    const c: C = { z: true }

    const m = _.mergeOptions(a, c)
    expect(m).toEqual({ x: 1, y: 'ok', z: true })
  })

  it('A undefined ⇒ result = B widened', () => {
    const b: B = { y: 'hi', z: false }

    const m = _.mergeOptions(undefined, b)
    expect(m).toEqual({ y: 'hi', z: false })
  })

  it('B undefined ⇒ result = A widened', () => {
    const a: A = { x: 42 }

    const m = _.mergeOptions(a, undefined)
    expect(m).toEqual({ x: 42 })
  })

  it('both undefined ⇒ result = undefined', () => {
    const m = _.mergeOptions(undefined, undefined)
    expect(m).toBeUndefined()
  })

  it('preserve optional when A has optional key', () => {
    type A2 = { p?: string } | undefined

    const m1 = _.mergeOptions({ p: 'ok' } satisfies A2, {})
    const m2 = _.mergeOptions(undefined, {})

    expect(m1).toEqual({ p: 'ok' })
    expect(m2).toEqual({})
  })

  it('merges class instance and plain object', () => {
    const anderson = new Character('Thomas Anderson', 49)
    const neo = { name: 'Neo', alias: 'The One' }

    const merged = _.mergeOptions(anderson, neo)

    expect(merged).toEqual({
      name: 'Neo',
      alias: 'The One',
      age: 49,
    })
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
