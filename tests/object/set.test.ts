import * as _ from 'radashi'

describe('set', () => {
  test('handle bad input', () => {
    expect(_.set({}, '', {})).toEqual({})
    expect(_.set({}, null as any, {})).toEqual({})
    expect(_.set({}, '', null as any)).toEqual({})
    expect(_.set(null as any, '', {})).toEqual({})
    expect(_.set(null as any, null as any, null as any)).toEqual({})
  })

  test('deeply clone affected objects', () => {
    const input = {
      a: { b: { c: [1] } },
      d: {},
    }
    const output = _.set(input, 'a.b.c.0', 2)
    expect(output).toEqual({
      a: { b: { c: [2] } },
      d: {},
    })
    expect(output).not.toBe(input)
    expect(output.a).not.toBe(input.a)
    expect(output.a.b).not.toBe(input.a.b)
    expect(output.a.b.c).not.toBe(input.a.b.c)
    // Unaffected objects are returned as is
    expect(output.d).toBe(input.d)
  })

  test('return the initial object if nothing changes', () => {
    const input = { a: { b: 1 } }
    const output = _.set(input, 'a.b', 1)
    expect(output).toBe(input)
    expect(output.a).toBe(input.a)
  })

  test('set a direct property', () => {
    expect(_.set({ foo: true }, 'foo', false)).toEqual({ foo: false })
    expect(_.set({}, 'foo', 0)).toEqual({ foo: 0 })
  })

  test('set a deep property with object notation', () => {
    expect(_.set({}, 'cards.value', 2)).toEqual({
      cards: { value: 2 },
    })
  })

  test('set a deep property with array notation', () => {
    expect(_.set({}, 'cards.0.value', 2)).toEqual({
      cards: [{ value: 2 }],
    })
  })

  test('set a deep property with sparse array', () => {
    expect(_.set({}, 'cards.2.value', 2)).toEqual({
      // biome-ignore lint/suspicious/noSparseArray:
      cards: [, , { value: 2 }],
    })
  })

  test('set a deep property with nested arrays', () => {
    expect(_.set({}, 'cards.0.0.value', 2)).toEqual({
      cards: [[{ value: 2 }]],
    })
  })

  test('set a deep property with sparse nested arrays', () => {
    expect(_.set({}, 'cards.2.2.value', 2)).toEqual({
      // biome-ignore lint/suspicious/noSparseArray:
      cards: [, , [, , { value: 2 }]],
    })
  })

  test('set a deep property with explicit array notation', () => {
    expect(_.set({}, 'cards.[0].[0].value', 2)).toEqual({
      cards: [[{ value: 2 }]],
    })
  })

  test('set a deep property with explicit sparse array notation', () => {
    expect(_.set({}, 'cards.[1].[1].value', 2)).toEqual({
      // biome-ignore lint/suspicious/noSparseArray:
      cards: [, [, { value: 2 }]],
    })
  })

  test('set a key starting with a number', () => {
    expect(_.set({}, 'cards.0value', 2)).toEqual({
      cards: { '0value': 2 },
    })
    expect(_.set({}, 'cards.1234value', 2)).toEqual({
      cards: { '1234value': 2 },
    })
  })

  test('prototype pollution is forbidden', () => {
    expect(() => _.set({}, '__proto__.polluted', true)).toThrowError(
      'Unsafe key in path: __proto__',
    )
    expect(() => _.set({}, 'prototype.polluted', true)).toThrowError(
      'Unsafe key in path: prototype',
    )

    // Prototype-less objects don't care:
    let obj = Object.create(null)

    obj = _.set(obj, '__proto__.polluted', true)
    expect(Object.getPrototypeOf(obj)).toBe(null)
    expect(obj.__proto__).toEqual({ polluted: true })

    obj = _.set(obj, 'prototype.polluted', true)
    expect(Object.getPrototypeOf(obj)).toBe(null)
    expect(obj.prototype).toEqual({ polluted: true })
  })

  test('constructor pollution is forbidden', () => {
    expect(() => _.set({}, 'constructor.polluted', true)).toThrowError(
      'Unsafe key in path: constructor',
    )

    // Prototype-less objects don't care:
    let obj = Object.create(null)
    obj = _.set(obj, 'constructor.polluted', true)
    expect(obj.constructor).toEqual({ polluted: true })
  })
})
