import * as _ from 'radashi'

describe('title', () => {
  const mixed = 'hello_world-fooBar baz.qux'
  const long = 'someVariableName_with-mixed.separators '.repeat(20)

  bench('with valid input', () => {
    _.title('hello world')
  })

  bench('with mixed separators and camel case', () => {
    _.title(mixed)
  })

  bench('with a long string', () => {
    _.title(long)
  })
})
