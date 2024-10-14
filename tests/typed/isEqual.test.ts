import * as _ from 'radashi'

describe('isEqual', () => {
  class Person {
    name: string
    friends: Person[] = []
    self?: Person
    constructor(name: string) {
      this.name = name
    }
  }
  const jake = new Person('jake')
  jake.self = jake
  jake.friends = [jake, jake]
  const symbolKey = Symbol('symKey')
  const complex = {
    num: 0,
    str: '',
    boolean: true,
    unf: void 0,
    nul: null,
    obj: { name: 'object', id: 1, children: [0, 1, 2] },
    arr: [0, 1, 2],
    func() {
      return true
    },
    loop: null as any,
    person: jake,
    date: new Date(0),
    reg: /\/regexp\/ig/,
    [symbolKey]: 'symbol',
  }
  complex.loop = complex
  test('returns true for equal things', () => {
    expect(_.isEqual(0, 0)).toBeTruthy()
    expect(_.isEqual('a', 'a')).toBeTruthy()
    const hello = Symbol('hello')
    expect(_.isEqual(hello, hello)).toBeTruthy()
    expect(_.isEqual({}, {})).toBeTruthy()
    expect(_.isEqual(true, true)).toBeTruthy()
    expect(_.isEqual(new RegExp(/a*s/), new RegExp(/a*s/))).toBeTruthy()
    const now = new Date()
    expect(_.isEqual(now, now)).toBeTruthy()
    expect(_.isEqual([], [])).toBeTruthy()
    expect(_.isEqual(complex, { ...complex })).toBeTruthy()
    expect(
      _.isEqual([complex, complex], [{ ...complex }, { ...complex }]),
    ).toBeTruthy()
  })
  test('returns false for non-equal things', () => {
    expect(_.isEqual(0, 1)).toBeFalsy()
    expect(_.isEqual('a', 'b')).toBeFalsy()
    expect(_.isEqual(new RegExp(/^http:/), new RegExp(/https/))).toBeFalsy()
    expect(_.isEqual(Symbol('hello'), Symbol('goodbye'))).toBeFalsy()
    expect(_.isEqual({ z: 23 }, { a: 1 })).toBeFalsy()
    expect(_.isEqual(true, false)).toBeFalsy()
    expect(
      _.isEqual(new Date(), new Date('2022-09-01T03:25:12.750Z')),
    ).toBeFalsy()
    expect(_.isEqual([], [1])).toBeFalsy()
    expect(_.isEqual(complex, { ...complex, num: 222 })).toBeFalsy()
    expect(_.isEqual([complex], [{ ...complex, num: 222 }])).toBeFalsy()
  })
})
