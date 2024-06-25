import * as _ from 'radashi'

describe('lowerize function', () => {
  test('changes all keys to lower case', () => {
    const result = _.lowerize({
      'X-Api-Key': 'value',
      Bearer: 'value'
    })
    expect(result).toEqual({
      'x-api-key': 'value',
      bearer: 'value'
    })
  })
})
