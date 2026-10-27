import * as _ from 'radashi'

const cast = <T = object>(value: any): T => value

describe('assign', () => {
  const initial = {
    name: 'jay',
    cards: ['ac'],
    location: {
      street: '23 main',
      state: {
        abbreviation: 'FL',
        name: 'Florida',
      },
    },
  }
  const override = {
    name: 'charles',
    cards: ['4c'],
    location: {
      street: '8114 capo',
      state: {
        abbreviation: 'TX',
        name: 'Texas',
      },
    },
  }
  test('correctly assign a with values from b', () => {
    const result = _.assign(initial, override)
    expect(result).toEqual(override)
  })
  test('handles initial have unique value', () => {
    const result = _.assign({ a: 'x' }, {})
    expect(result).toEqual({ a: 'x' })
  })
  test('handles override have unique value', () => {
    const result = _.assign({}, { b: 'y' })
    expect(result).toEqual({ b: 'y' })
  })
  test('handles null overriding nested object', () => {
    const result = _.assign({ a: { b: { c: 1 } } }, { a: { b: null } })
    expect(result).toEqual({ a: { b: null } })
  })
  test('works with Object.create(null)', () => {
    const object = { a: Object.create(null) }
    object.a.b = 1

    const result = _.assign(object, { a: { c: 2 } })

    expect(result).toEqual({ a: { b: 1, c: 2 } })
    expect(Object.getPrototypeOf(result.a)).toBe(null)
  })
  test('prototype pollution is forbidden', () => {
    const result = _.assign(
      { a: 1 },
      cast(JSON.parse('{"__proto__":{"polluted":true},"b":2}')),
    )
    expect(result).toEqual({ a: 1, b: 2 })
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
    expect(cast<any>(result).polluted).toBeUndefined()
    expect(cast<any>({}).polluted).toBeUndefined()

    expect(() =>
      _.assign({}, cast(JSON.parse('{"constructor":{"x":1}}'))),
    ).not.toThrow()
    expect(_.assign({}, cast(JSON.parse('{"prototype":{"x":1}}')))).toEqual({})
  })
  test('prototype pollution is forbidden in nested objects', () => {
    const result = _.assign(
      { p: { a: 1 } },
      cast({ p: JSON.parse('{"__proto__":{"polluted":true},"b":2}') }),
    )
    expect(result.p).toEqual({ a: 1, b: 2 })
    expect(Object.getPrototypeOf(result.p)).toBe(Object.prototype)
    expect(cast<any>(result.p).polluted).toBeUndefined()
  })
  test('prototype-less objects allow dangerous keys', () => {
    const initial = Object.create(null)
    initial.a = 1

    const result = _.assign(
      initial,
      cast(JSON.parse('{"__proto__":{"x":1},"b":2}')),
    )
    expect(Object.getPrototypeOf(result)).toBe(null)
    expect(cast<any>(result).__proto__).toEqual({ x: 1 })
    expect(cast<any>(result).b).toBe(2)
  })
})
