import * as _ from 'radashi'

describe('cloneDeep', () => {
  test('clone a simple object with no nested objects', () => {
    const obj = { a: 1, b: 'test' }
    const cloned = _.cloneDeep(obj, o => ({ ...o }))
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
  })

  test('clone an object with nested objects', () => {
    const obj = { a: 1, b: { c: 2 } }
    const cloned = _.cloneDeep(obj, o => ({ ...o }))
    expect(cloned).toEqual(obj)
    expect(cloned.b).not.toBe(obj.b)
  })

  test('clone an object with arrays and nested arrays', () => {
    const obj = { a: [1, 2], b: { c: [3, 4] } }
    const cloned = _.cloneDeep(obj, o => (_.isArray(o) ? [...o] : { ...o }))
    expect(cloned).toEqual(obj)
    expect(cloned.a).not.toBe(obj.a)
    expect(cloned.b.c).not.toBe(obj.b.c)
  })

  test('handle null values correctly', () => {
    const obj = { a: null }
    const cloned = _.cloneDeep(obj, o => ({ ...o }))
    expect(cloned).toEqual(obj)
  })

  test('clone an object with multiple levels of nested objects', () => {
    const obj = { a: 1, b: { c: { d: 2 } } }
    const cloned = _.cloneDeep(obj, o => ({ ...o }))
    expect(cloned).toEqual(obj)
    expect(cloned.b).not.toBe(obj.b)
    expect(cloned.b.c).not.toBe(obj.b.c)
  })

  test('clone an object with complex types of nested objects', () => {
    const obj = { a: new Date(), b: /test/g, c: [1, 2] }
    const cloned = _.cloneDeep(obj, o => ({ ...o }))
    expect(cloned).toEqual(obj)
    expect(cloned.a).toEqual(obj.a)
    expect(cloned.b).toEqual(obj.b)
    expect(cloned.c).not.toBe(obj.c)
  })

  test('do not clone objects that are part of the prototype chain', () => {
    const proto = { a: 1 }
    const obj = Object.create(proto)
    obj.b = 2
    const cloned = _.cloneDeep(obj, o => ({ ...o }))
    expect(cloned).toEqual(obj)
    expect(Object.getPrototypeOf(cloned)).toEqual(Object.getPrototypeOf(obj))
  })

  test('set ownKeys argument to handle objects with non-enumerable properties', () => {
    const obj = { a: 1 }
    Object.defineProperty(obj, 'b', { value: 2, enumerable: false })
    const cloned = _.cloneDeep(
      obj,
      o => ({ ...o }),
      undefined,
      o => Reflect.ownKeys(o),
    )
    expect(cloned).toEqual(obj)
  })

  test('handle circular references', () => {
    const obj: any = { a: 1 }
    obj.b = obj
    const cloned = _.cloneDeep(obj, o => ({ ...o }))
    expect(cloned).toEqual(obj)
    expect(cloned.b).toBe(cloned)
  })
})
