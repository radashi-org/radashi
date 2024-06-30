import * as _ from 'radashi'

const cast = <T = any>(value: any): T => value

describe('pick function', () => {
  test('handles null input', () => {
    const result = _.pick(cast(null), [])
    expect(result).toEqual({})
  })
  test('handles empty keys', () => {
    const result = _.pick({ a: 2 }, [])
    expect(result).toEqual({})
  })
  test('handle key not in object', () => {
    const result = _.pick({ a: 2, b: 3 }, ['c'] as any)
    expect(result).toEqual({} as any)
  })
  test('handle one key not in object', () => {
    const result = _.pick({ a: 2, b: 3 }, ['a', 'c'] as any)
    expect(result).toEqual({ a: 2 } as any)
  })
  test('does not ignore undefined values', () => {
    const result = _.pick({ a: 2, b: undefined }, ['b'])
    expect(result).toEqual({ b: undefined })
  })
  test('returns picked properties only', () => {
    const result = _.pick({ a: 2, b: 4 }, ['a'])
    expect(result).toEqual({
      a: 2,
    })
  })
  test('type: accepts an interface', () => {
    interface SomeDeclaredType {
      a: string
      b: Error
      c: number[]
    }
    const x: SomeDeclaredType = {
      a: 'alpha',
      b: new Error('beta'),
      c: [3],
    }
    const result = _.pick(x, ['a'])
    expect(result).toEqual({
      a: 'alpha',
    })
  })
  test('works with proxified objects', () => {
    const target = {
      a: 'hello',
      b: 'everyone',
    }
    const handler1 = {
      get() {
        return 'world'
      },
    }
    const proxified = new Proxy(target, handler1)
    const result = _.pick(proxified, ['a'])
    expect(result).toEqual({
      a: 'world',
    })
  })
  test('works with objects created without the prototype chain of Object e.g. by `Object.create(null)`', () => {
    const obj = Object.create(null)
    obj.a = 2
    obj.b = 4
    const result = _.pick(obj, ['a'])
    expect(result).toEqual({
      a: 2,
    })
  })
  test('works with objects that have `hasOwnProperty` overwritten', () => {
    const obj = { a: 2, b: 4 }
    // @ts-ignore
    obj.hasOwnProperty = 'OVERWRITTEN'
    const result = _.pick(obj, ['a'])
    expect(result).toEqual({
      a: 2,
    })
  })
})
