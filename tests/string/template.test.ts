import { runInNewContext } from 'node:vm'
import * as _ from 'radashi'

describe('template', () => {
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

  test('supports a custom expression without the global flag', () => {
    const result = runInNewContext(
      'template("Hello <name>, <name>", { name: "Ray" }, /<(.+?)>/)',
      { template: _.template },
      { timeout: 1000 },
    )

    expect(result).toBe('Hello Ray, <name>')
  })

  test('advances after zero-width matches', () => {
    const result = runInNewContext(
      'template("name", { name: "Ray " }, /(?=(name))/g)',
      { template: _.template },
      { timeout: 1000 },
    )

    expect(result).toBe('Ray name')
  })

  test('keeps replacement values literal', () => {
    expect(_.template('<name>', { name: '$&' }, /<(.+?)>/g)).toBe('$&')
  })

  test('preserves the lookup for an expression without a capture group', () => {
    expect(_.template('name', { undefined: 'Ray' }, /name/g)).toBe('Ray')
  })
})
