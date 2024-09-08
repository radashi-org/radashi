import * as _ from 'radashi'

describe('isClass', () => {
  bench('with class', () => {
    _.isClass(class CustomClass {})
  })

  bench('with non-class', () => {
    _.isNumber({})
  })
})
