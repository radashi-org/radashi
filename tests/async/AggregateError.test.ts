import { vi } from 'vitest'

const { AggregateError: nativeAggregateError } = globalThis
globalThis.AggregateError = undefined!
const { AggregateError } = await import('radashi')
globalThis.AggregateError = nativeAggregateError

// Run the same behavioral checks against the native implementation.
describe.each([
  ['polyfill', AggregateError],
  ['native', nativeAggregateError],
])('AggregateError (%s)', (_, Constructor) => {
  test('creates an Error with its own message and stack', () => {
    const inner = new Error('inner failure')
    inner.name = 'InnerError'
    inner.stack = 'inner stack'
    const error = new Constructor([inner], 'outer failure')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(Constructor)
    expect(error.name).toBe('AggregateError')
    expect(error.message).toBe('outer failure')
    expect(error.stack).toContain('AggregateError: outer failure')
    expect(error.stack).not.toBe(inner.stack)
    expect(Object.prototype.toString.call(error)).toBe('[object Error]')
    expect(Object.keys(error)).toEqual([])
  })

  test('can be called without new', () => {
    const error = Constructor([], 'failure')
    expect(error).toBeInstanceOf(Constructor)
    expect(error.message).toBe('failure')
    expect(error.errors).toEqual([])
  })

  test('supports subclasses', () => {
    const Parent: typeof AggregateError = Constructor
    class CustomError extends Parent {}
    const error = new CustomError([1], 'failure')
    expect(error).toBeInstanceOf(CustomError)
    expect(error).toBeInstanceOf(Constructor)
    expect(error).toBeInstanceOf(Error)
    expect(error.errors).toEqual([1])
    expect(error.message).toBe('failure')
  })

  test.each([undefined, '', 'failure', 123, null])(
    'matches native message properties for %s',
    message => {
      const error = new Constructor([], message as string)
      const native = new nativeAggregateError([], message as string)
      expect(error.message).toBe(native.message)
      expect(Object.getOwnPropertyDescriptor(error, 'message')).toEqual(
        Object.getOwnPropertyDescriptor(native, 'message'),
      )
    },
  )

  test('rejects a symbol message', () => {
    expect(() => new Constructor([], Symbol() as never)).toThrow(TypeError)
  })

  test('copies arbitrary values without reading their properties', () => {
    const values = [null, undefined, 1, 'failure', { name: 'InnerError' }]
    const error = new Constructor(values)
    expect(error.errors).toEqual(values)
    expect(error.errors).not.toBe(values)
    values.push('later')
    expect(error.errors).toHaveLength(5)
    expect(Object.getOwnPropertyDescriptor(error, 'errors')).toEqual({
      value: error.errors,
      writable: true,
      configurable: true,
      enumerable: false,
    })
  })

  test('accepts a Set', () => {
    expect(new Constructor(new Set([1, 2])).errors).toEqual([1, 2])
  })

  test('accepts a generator', () => {
    function* errors() {
      yield null
      yield 1
    }
    expect(new Constructor(errors()).errors).toEqual([null, 1])
  })

  test('accepts a string iterable', () => {
    expect(new Constructor('ab').errors).toEqual(['a', 'b'])
  })

  test.each([undefined, null, 1, {}, { 0: 'error', length: 1 }])(
    'rejects non-iterable errors: %s',
    errors => {
      expect(() => new Constructor(errors as never)).toThrow(TypeError)
    },
  )

  test.each([
    undefined,
    null,
    false,
    1,
    'ignored',
    {},
    { cause: undefined },
    { cause: 'failure' },
    Object.create({ cause: 'inherited' }),
    Object.assign(() => {}, { cause: 'function' }),
  ])('matches native cause properties for %s', options => {
    const args = [[], 'failure', options]
    const error = Reflect.construct(Constructor, args)
    const native = Reflect.construct(nativeAggregateError, args)
    expect(Object.getOwnPropertyDescriptor(error, 'cause')).toEqual(
      Object.getOwnPropertyDescriptor(native, 'cause'),
    )
  })

  test('converts the message and reads the cause before iterating errors', () => {
    const order: string[] = []
    const message = {
      toString() {
        order.push('message')
        return 'failure'
      },
    }
    const options = {
      get cause() {
        order.push('cause')
        return 'cause'
      },
    }
    const errors = {
      *[Symbol.iterator]() {
        order.push('errors')
        yield 1
      },
    }
    Reflect.construct(Constructor, [errors, message, options])
    expect(order).toEqual(['message', 'cause', 'errors'])
  })

  test('exposes native prototype properties', () => {
    expect(Object.getPrototypeOf(Constructor)).toBe(Error)
    expect(Object.getPrototypeOf(Constructor.prototype)).toBe(Error.prototype)
    expect(Constructor.prototype.constructor).toBe(Constructor)
    expect(Constructor.length).toBe(2)
    for (const key of ['name', 'message']) {
      expect(
        Object.getOwnPropertyDescriptor(Constructor.prototype, key),
      ).toEqual(
        Object.getOwnPropertyDescriptor(nativeAggregateError.prototype, key),
      )
    }
    expect(
      Object.getOwnPropertyDescriptor(Constructor, 'prototype')?.writable,
    ).toBe(false)
  })
})

describe('AggregateError selection', () => {
  afterEach(() => {
    globalThis.AggregateError = nativeAggregateError
    vi.resetModules()
  })

  test('uses the polyfill when the native constructor is missing', async () => {
    globalThis.AggregateError = undefined!
    vi.resetModules()
    const { AggregateError } = await import('radashi')
    expect(AggregateError).not.toBe(nativeAggregateError)
    expect(new AggregateError([]).name).toBe('AggregateError')
  })

  test('uses the native constructor when available', async () => {
    vi.resetModules()
    const { AggregateError } = await import('radashi')
    expect(AggregateError).toBe(nativeAggregateError)
  })
})
