import * as _ from 'radashi'

describe('upperize', () => {
  test('changes all keys to upper case', () => {
    const result = _.upperize({
      'x-api-key': 'value',
      bearer: 'value',
    })
    expect(result).toEqual({
      'X-API-KEY': 'value',
      BEARER: 'value',
    })
  })
})
