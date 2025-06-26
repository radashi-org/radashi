import * as _ from 'radashi'

describe('escapeHTML', () => {
  bench('with valid input', () => {
    _.escapeHTML('&<>"\'')
  })
})
