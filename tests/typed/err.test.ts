import * as _ from 'radashi'

describe('err', () => {
  test('should construct Err results', () => {
    expect(_.err(404)).toStrictEqual({ ok: false, value: undefined, error: 404 })
    expect(_.err('Not Found')).toStrictEqual({ ok: false, value: undefined, error: 'Not Found' })
    expect(_.err(null)).toStrictEqual({ ok: false, value: undefined, error: null })
    expect(_.err(undefined)).toStrictEqual({ ok: false, value: undefined, error: undefined })
  })
})
