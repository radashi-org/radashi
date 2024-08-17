import * as _ from 'radashi'

describe('isFunction', () => {
  bench('with null', () => {
    _.isFunction(null)
  })

  bench('with anonymous function', () => {
    _.isFunction(() => 'hello')
  })

  bench('with arrow function', () => {
    _.isFunction(() => {
      return 'hello'
    })
  })

  bench('with named function', () => {
    function sayHello() {
      return 'hello'
    }
    _.isFunction(sayHello)
  })
})
