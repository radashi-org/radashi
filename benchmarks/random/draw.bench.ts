import * as _ from 'radashi'

describe('draw', () => {
  bench('with valid input', () => {
    const letters = 'abcde'
    _.draw(letters.split(''))
  })
})
