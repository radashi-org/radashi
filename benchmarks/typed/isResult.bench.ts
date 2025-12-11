import * as _ from 'radashi'

describe('isResult', () => {
  bench('with valid Ok value', () => {
    _.isResult({ ok: true, value: 42, error: undefined })
  })
  bench('with valid Err value', () => {
    _.isResult({ ok: false, value: undefined, error: 42 })
  })
  bench('with invalid value', () => {
    _.isResult({ ok: true, value: 42, error: 42 })
  })
})
