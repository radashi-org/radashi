import * as _ from 'radashi'

describe('isEqual', () => {
  bench('with numbers', () => {
    expect(_.isEqual(0, 0)).toBeTruthy()
  })

  bench('with strings', () => {
    expect(_.isEqual('a', 'a')).toBeTruthy()
  })

  bench('with objects', () => {
    expect(_.isEqual({}, {})).toBeTruthy()
  })

  bench('with arrays', () => {
    expect(_.isEqual([], [])).toBeTruthy()
  })

  bench('with complex objects', () => {
    class Person {
      constructor(readonly name: string) {}
    }
    const jake = new Person('jake')
    const symbolKey = Symbol('symbol')
    const complex = {
      num: 0,
      str: '',
      boolean: true,
      unf: void 0,
      nul: null,
      obj: { name: 'object', id: 1, chilren: [0, 1, 2] },
      arr: [0, 1, 2],
      func() {
        console.log('function')
      },
      loop: null as any,
      person: jake,
      date: new Date(0),
      reg: /\/regexp\/ig/,
      [symbolKey]: 'symbol',
    }
    complex.loop = complex
    expect(_.isEqual(complex, { ...complex })).toBeTruthy()
  })
})
