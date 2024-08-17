import * as _ from 'radashi'

describe('isPlainObject', () => {
  bench('with object literal', () => {
    _.isPlainObject({})
  })

  bench('with Object.create(null)', () => {
    _.isPlainObject(Object.create(null))
  })

  bench('with non-plain object (Date)', () => {
    _.isPlainObject(new Date())
  })

  bench('with namespace object', () => {
    _.isPlainObject(Math)
  })

  bench('with non-plain object (arguments)', () => {
    function returnArguments() {
      // biome-ignore lint/style/noArguments:
      return arguments
    }
    _.isPlainObject(returnArguments())
  })

  bench('with null', () => {
    _.isPlainObject(null)
  })
})
