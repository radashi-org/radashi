import * as _ from 'radashi'

describe('toInt', () => {
  bench('with string', () => {
    _.toInt('20')
  })

  bench('with undefined', () => {
    _.toInt(undefined)
  })
})
