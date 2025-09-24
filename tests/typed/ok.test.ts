import * as _ from 'radashi'

describe('ok', () => {
  test('should construct Ok results', () => {
    expect(_.ok(42)).toStrictEqual({ ok: true, value: 42, error: undefined })
    expect(_.ok('hello')).toStrictEqual({ ok: true, value: 'hello', error: undefined })
    expect(_.ok(null)).toStrictEqual({ ok: true, value: null, error: undefined })
    expect(_.ok(undefined)).toStrictEqual({ ok: true, value: undefined, error: undefined })
  })
})
