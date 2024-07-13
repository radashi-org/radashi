import * as _ from 'radashi'

describe('getter', () => {
  test('returns the same function if provided a function', () => {
    const fn = (arg: number) => arg * 2
    const get = _.getter(fn)
    expect(get(5)).toBe(10)
  })

  test('returns the property value if provided a property name', () => {
    const obj = { a: 1, b: 2 }
    expect(_.getter('a')(obj)).toBe(1)
  })

  test('returns the original argument if provided undefined', () => {
    const arg = { a: 1 }
    expect(_.getter(undefined)(arg)).toBe(arg)
  })

  test('returns never for invalid property access', () => {
    const obj = { a: 1 }
    // @ts-expect-error
    expect(_.getter('invalid')(obj)).toBe(undefined)
  })

  test('handles arrays correctly', () => {
    const arr = [1, 2, 3]
    expect(_.getter(0)(arr)).toBe(1)
  })
})
