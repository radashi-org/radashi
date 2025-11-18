import * as _ from 'radashi'

describe('get', () => {
  type Person = {
    name: string
    age: number
    friends?: Person[]
  }
  const jay: Person = {
    name: 'jay',
    age: 17,
    friends: [
      {
        name: 'carl',
        age: 17,
        friends: [
          {
            name: 'sara',
            age: 17,
          },
        ],
      },
    ],
  }
  test('handles null and undefined input', () => {
    expect(_.get(null, 'name')).toBeUndefined()
    expect(_.get(undefined, 'name')).toBeUndefined()
  })
  test('respects undefined as default value', () => {
    expect(_.get({}, 'a.b.c', undefined)).toBeUndefined()
  })
  test('returns specified value or default using path', () => {
    expect(_.get({ age: undefined }, 'age', 22)).toBe(22)
    expect(_.get(jay, 'friends[0].age')).toBe(17)
    expect(_.get(jay, 'friends["0"].age')).toBe(17)
    expect(_.get(jay, 'friends.0.age')).toBe(17)
    expect(_.get(jay, 'friends.1.age')).toBeUndefined()
    expect(_.get(jay, 'friends.0.friends[0].name')).toBe('sara')
    expect(_.get(jay, 'name')).toBe('jay')
    expect(_.get(jay, '[name]')).toBe('jay')
    expect(_.get(jay, '["name"]')).toBe('jay')
    expect(_.get(jay, 'friends[0][name]')).toBe('carl')
    expect(_.get(jay, 'friends[0].friends[0].friends[0].age', 22)).toBe(22)
  })

  test('returns default when final resolved value is null', () => {
    const obj = { a: { b: null } }
    expect(_.get(obj, 'a.b', 123)).toBe(123)
  })

  test('does not replace falsy non-nullish values with default', () => {
    const obj = { a: 0, b: '', c: false }
    expect(_.get(obj, 'a', 123)).toBe(0)
    expect(_.get(obj, 'b', 'abc')).toBe('')
    expect(_.get(obj, 'c', true)).toBe(false)
  })

  test('null nested property returns default', () => {
    const obj = { x: { y: null } }
    expect(_.get(obj, 'x.y', 'DEF')).toBe('DEF')
  })
})
