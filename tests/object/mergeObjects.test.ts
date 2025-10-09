import * as _ from 'radashi'

type A = { x: number; y?: string } | undefined
type B = { y: string; z: boolean } | undefined
type C = { y: number; z: boolean } | undefined

describe('mergeOptions', () => {
  it('merge two plain objects', () => {
    const a: A = { x: 1, y: 'ok' }
    const b: B = { y: 'override', z: true }

    const m = _.mergeOptions(a, b)
    expectTypeOf(m).toMatchObjectType<{ x: number; y: string; z: boolean }>()
  })
})
