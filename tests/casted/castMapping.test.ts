import * as _ from 'radashi'

describe('castMapping', () => {
  test('returns the same function if provided a function', () => {
    const fn = (arg: number) => arg * 2
    const get = _.castMapping(fn)
    expect(get(5)).toBe(10)
  })

  test('returns the property value if provided a property name', () => {
    const obj = { a: 1, b: 2 }
    const get = _.castMapping('a')
    expect(get(obj)).toBe(1)
  })

  test('returns the original argument if provided undefined', () => {
    const arg = { a: 1 }
    const get = _.castMapping(undefined)
    expect(get(arg)).toBe(arg)
  })

  test('returns never for invalid property access', () => {
    const obj = { a: 1 }
    const get = _.castMapping('invalid')
    // @ts-expect-error
    expect(get(obj)).toBe(undefined)
  })

  test('handles arrays correctly', () => {
    const arr = [1, 2, 3]
    expect(_.castMapping(0)(arr)).toBe(1)
  })
})
