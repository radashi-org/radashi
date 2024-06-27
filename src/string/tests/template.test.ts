import * as _ from 'radashi'

describe('template function', () => {
  test('replaces all occurrences', () => {
    const tmp = `
  Hello my name is {{name}}. I am a {{type}}.
  Not sure why I am {{reason}}.

  Thank You - {{name}}
`
    const data = {
      name: 'Ray',
      type: 'template',
      reason: 'so beautiful',
    }

    const result = _.template(tmp, data)
    const expected = `
  Hello my name is ${data.name}. I am a ${data.type}.
  Not sure why I am ${data.reason}.

  Thank You - ${data.name}
`

    expect(result).toBe(expected)
  })

  test('replaces all occurrences given template', () => {
    const tmp = 'Hello <name>.'
    const data = {
      name: 'Ray',
    }

    const result = _.template(tmp, data, /<(.+?)>/g)
    expect(result).toBe(`Hello ${data.name}.`)
  })
})
