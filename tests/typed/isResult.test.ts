import * as _ from 'radashi'

describe('isResult', () => {
  test('should return true for valid Result objects', () => {
    expect(_.isResult({ ok: true, value: 42, error: undefined })).toBe(true)
    expect(_.isResult({ ok: true, value: undefined, error: undefined })).toBe(
      true,
    )
    expect(_.isResult({ ok: false, value: undefined, error: 42 })).toBe(true)
    expect(
      _.isResult({ ok: false, value: undefined, error: new Error() }),
    ).toBe(true)
    expect(
      _.isResult({ ok: false, value: undefined, error: new TypeError() }),
    ).toBe(true)
    expect(_.isResult({ ok: false, value: undefined, error: undefined })).toBe(
      true,
    )
  })

  test('should return false for invalid Result objects', () => {
    expect(_.isResult({ ok: true, value: 42, error: 42 })).toBe(false)
    expect(_.isResult({ ok: false, value: 42, error: 42 })).toBe(false)
    expect(_.isResult({ ok: true, value: 42 })).toBe(false)
    expect(_.isResult({ ok: true, error: 42 })).toBe(false)
    expect(_.isResult({ value: 42, error: undefined })).toBe(false)
  })

  test('should return false for non-object values', () => {
    expect(_.isResult([])).toBe(false)
    expect(_.isResult('')).toBe(false)
    expect(_.isResult(null)).toBe(false)
  })
})
