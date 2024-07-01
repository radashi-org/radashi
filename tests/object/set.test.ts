import * as _ from 'radashi'

describe('set', () => {
  test('handles bad input', () => {
    expect(_.set({}, '', {})).toEqual({})
    expect(_.set({}, null as any, {})).toEqual({})
    expect(_.set({}, '', null as any)).toEqual({})
    expect(_.set(null as any, '', {})).toEqual({})
    expect(_.set(null as any, null as any, null as any)).toEqual({})
    expect(_.set({ foo: true }, 'foo', false)).toEqual({ foo: false })
    expect(_.set({}, 'foo', 0)).toEqual({ foo: 0 })
  })
  test('sets deep values correctly', () => {
    expect(_.set({}, 'cards.value', 2)).toEqual({
      cards: { value: 2 },
    })
    expect(_.set({}, 'cards.0.value', 2)).toEqual({
      cards: [{ value: 2 }],
    })
    expect(_.set({}, 'cards.2.value', 2)).toEqual({
      cards: [undefined, undefined, { value: 2 }],
    })
    expect(_.set({}, 'cards.0.0.value', 2)).toEqual({
      cards: [[{ value: 2 }]],
    })
    expect(_.set({}, 'cards.2.2.value', 2)).toEqual({
      cards: [undefined, undefined, [undefined, undefined, { value: 2 }]],
    })
    expect(_.set({}, 'cards.[0].[0].value', 2)).toEqual({
      cards: [[{ value: 2 }]],
    })
    expect(_.set({}, 'cards.[1].[1].value', 2)).toEqual({
      cards: [undefined, [undefined, { value: 2 }]],
    })
  })
  test('sets keys starting with numbers correctly', () => {
    expect(_.set({}, 'cards.0value', 2)).toEqual({
      cards: { '0value': 2 },
    })
    expect(_.set({}, 'cards.1234value', 2)).toEqual({
      cards: { '1234value': 2 },
    })
  })
})
