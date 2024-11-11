import * as _ from 'radashi'

describe('dedent', () => {
  test('inferring the indentation of a consistently indented string', () => {
    const string = `
      Foo
        Bar
      Baz
    `
    expect(_.dedent(string)).toBe('Foo\n  Bar\nBaz')
  })
  test('inferring the indentation of a string with varying indentation', () => {
    const string = `
        Foo
      Bar
      Baz
    `
    expect(_.dedent(string)).toBe('Foo\n      Bar\n      Baz')

    const string2 = `
        Foo
        Bar
      Baz
    `
    expect(_.dedent(string2)).toBe('Foo\nBar\n      Baz')
  })
  test('explicit indentation: less than lowest indentation', () => {
    const string = `
      Foo
        Bar
      Baz
    `
    expect(_.dedent(string, ' '.repeat(4))).toBe('  Foo\n    Bar\n  Baz')
  })
  test('explicit indentation: more than lowest indentation', () => {
    const string = `
      Foo
        Bar
      Baz
    `
    // This should return the input string without an empty first line
    // or an empty last line.
    const lastLineOffset = string.lastIndexOf('\n')
    expect(_.dedent(string, ' '.repeat(10))).toBe(
      string.slice(1, lastLineOffset),
    )
  })
  test('tagged template strings', () => {
    const result = _.dedent`
      Foo ${1}
        Bar ${2}
      Baz ${3}
    `
    expect(result).toBe('Foo 1\n  Bar 2\nBaz 3')
  })
  test('preserve empty lines', () => {
    const result = _.dedent`


      Foo ${1}

      Bar ${2}
    `
    expect(result).toBe('\n\nFoo 1\n\nBar 2')
  })
  test('multiline embedded string', () => {
    const embedded = _.dedent`
      Line 1
        Line 2
      Line 3
    `
    expect(embedded).toBe(
      // biome-ignore format:
      'Line 1\n' +
      '  Line 2\n' +
      'Line 3',
    )
    const result = _.dedent`
      Outer 1
      ${embedded}
      Outer 2
    `
    expect(result).toBe(
      // biome-ignore format:
      'Outer 1\n' +
      'Line 1\n' +
      '  Line 2\n' +
      'Line 3\n' +
      'Outer 2',
    )
  })
  test('multiline embedded string with indentation', () => {
    const embedded = _.dedent`
      My list:
        - ${['Milk', 'Eggs', 'Bread'].join('\n- ')}
    `
    expect(embedded).toBe(
      // biome-ignore format:
      'My list:\n' +
      '  - Milk\n' +
      '  - Eggs\n' +
      '  - Bread',
    )
  })
  test('multiline embedded string led by an empty line', () => {
    const embedded = _.dedent`

      ${[1, 2, 3].join('\n')}
    `
    expect(embedded).toBe(
      // biome-ignore format:
      '\n' +
      '1\n' +
      '2\n' +
      '3',
    )
  })
  test('multiline embedded string: edge case 1', () => {
    let code = _.dedent`
      Hello World\n
    `
    code += _.dedent`

      // This is a comment.
      ${[1, 2, 3].join('\n')}
    `
    expect(code).toBe(
      // biome-ignore format:
      'Hello World\n' +
      '\n' +
      '// This is a comment.\n' +
      '1\n' +
      '2\n' +
      '3',
    )
  })
  test('line with less than removed indent', () => {
    const string = _.dedent`
        a
       b
      c
        d
    `
    expect(_.dedent(string)).toBe('a\n       b\n      c\nd')
  })
})
