import * as _ from 'radashi'

describe('set', () => {
  test('handle bad input', () => {
    expect(_.set({}, '', {})).toEqual({})
    expect(_.set({}, null as any, {})).toEqual({})
    expect(_.set({}, '', null as any)).toEqual({})
    expect(_.set(null as any, '', {})).toEqual({})
    expect(_.set(null as any, null as any, null as any)).toEqual({})
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
})
