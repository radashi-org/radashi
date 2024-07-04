import * as _ from 'radashi'

describe('cloneDeep', () => {
  test('simple object with no nested objects', () => {
    const source = { a: 1, b: 'test' }
    const result = _.cloneDeep(source)
    expect(result).toEqual(source)
    expect(result).not.toBe(source)
  })

  test('object with nested objects', () => {
    const source = { a: 1, b: { c: 2 } }
    const result = _.cloneDeep(source)
    expect(result).toEqual(source)
    expect(result.b).not.toBe(source.b)
  })

  test('object with multiple levels of nested objects', () => {
    const source = { a: 1, b: { c: { d: 2 } } }
    const result = _.cloneDeep(source)
    expect(result).toEqual(source)
    expect(result.b).not.toBe(source.b)
    expect(result.b.c).not.toBe(source.b.c)
  })

  test('object with arrays and nested arrays', () => {
    const source = { a: [1, [2]], b: { c: [3, 4] } }
    const result = _.cloneDeep(source)
    expect(result).toEqual(source)
    expect(result.a).not.toBe(source.a)
    expect(result.a[1]).not.toBe(source.a[1])
    expect(result.b.c).not.toBe(source.b.c)
  })

  test('object with complex types of nested objects', () => {
    const source = { a: { b: new Date(), c: /test/g, d: () => {} } }
    const result = _.cloneDeep(source)
    expect(result).toEqual(source)
    expect(result).not.toBe(source)
    expect(result.a).not.toBe(source.a)
    expect(result.a.b).toBe(source.a.b)
    expect(result.a.c).toBe(source.a.c)
    expect(result.a.d).toBe(source.a.d)
  })

  test('set ownKeys argument to handle objects with non-enumerable properties', () => {
    const source = { a: 1 }
    Object.defineProperty(source, 'b', { value: 2, enumerable: false })
    const result = _.cloneDeep(source, null, Reflect.ownKeys)
    expect(result).toEqual(source)
  })

  test('handle circular references', () => {
    const source: any = { a: 1 }
    source.b = source
    const result = _.cloneDeep(source)
    expect(result).not.toBe(source)
    expect(result).toEqual(source)
    expect(result.b).toBe(result)
  })

  test('avoid cloning an object more than once', () => {
    const source: any = { a1: { b: 1 } }
    source.a2 = source.a1
    const result = _.cloneDeep(source)
    expect(result).toEqual(source)
    expect(result.a1).toBe(result.a2)
    expect(result.a1).not.toBe(source.a1)
  })

  test('avoid calling the mapper for a skipped object more than once', () => {
    const source: any = { a1: { b: 1 } }
    source.a2 = source.a1

    const cloneObject = vi.fn(obj => (obj !== source ? obj : null))
    _.cloneDeep(source, {
      cloneObject,
    })

    // Once for the root object, another for the nested object that
    // appears twice.
    expect(cloneObject).toHaveBeenCalledTimes(2)
  })
})
