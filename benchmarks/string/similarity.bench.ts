import * as _ from 'radashi'

describe('similarity', () => {
  const string1 = 'h'.repeat(100)
  const string2 = 'ha'.repeat(50)
  const longString1 = 'h'.repeat(1000)
  const longString2 = 'ha'.repeat(500)
  const unequalString = 'x'.repeat(5000)

  bench('with 50% similar characters', () => {
    _.similarity(string1, string2)
  })

  bench('with 1000-character strings', () => {
    _.similarity(longString1, longString2)
  })

  bench('with 3 characters versus 5000 characters', () => {
    _.similarity('abc', unequalString)
  })

  bench('with 5000 characters versus 3 characters', () => {
    _.similarity(unequalString, 'abc')
  })
})
