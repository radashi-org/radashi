import * as _ from 'radashi'

describe('template', () => {
  bench('with valid input', () => {
    const tmp = `
  Hello my name is {{name}}. I am a {{type}}.
  Not sure why I am {{reason}}.

  Thank You - {{name}}
`
    const data = {
      name: 'SpongeBob',
      type: 'squarePants',
      reason: 'so likeable',
    }

    _.template(tmp, data)
  })
})
