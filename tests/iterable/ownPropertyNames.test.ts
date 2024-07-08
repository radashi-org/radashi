import * as _ from 'radashi'

describe('ownPropertyNames', () => {
  test('basic functionality', () => {
    const data = { a: 1, b: 2, c: 3 }
    const result = Array.from(_.ownPropertyNames(data))
    expect(result).toEqual(['a', 'b', 'c'])
  })
  test('numeric properties are converted to strings', () => {
    const data = [1, 2, 3]
    const result = Array.from(_.ownPropertyNames(data))
    expect(result).toEqual(['0', '1', '2'])
  })
  test('enumerable properties of prototype are skipped', () => {
    const data = { a: 1, b: 2, __proto__: { c: 3 } }
    const result = Array.from(_.ownPropertyNames(data))
    expect(result).toEqual(['a', 'b'])
  })
  test('non-enumerable properties are skipped', () => {
    const data = { a: 1, b: 2 }
    Object.defineProperty(data, 'c', { value: 3, enumerable: false })
    const result = Array.from(_.ownPropertyNames(data))
    expect(result).toEqual(['a', 'b'])
  })
  test('symbol properties are skipped', () => {
    const symbolKey = Symbol('c')
    const data = { a: 1, b: 2, [symbolKey]: 3 }
    const result = Array.from(_.ownPropertyNames(data))
    expect(result).toEqual(['a', 'b'])
  })
  test('class methods are skipped', () => {
    class TestClass {
      a = 1
      b() {}
    }
    const result = Array.from(_.ownPropertyNames(new TestClass()))
    expect(result).toEqual(['a'])
  })
  test("don't provide unexpected properties after type narrowing", () => {
    type FullLog = 'debug' | 'info' | 'error' | 'warn'
    type ProdLog = Extract<FullLog, 'warn' | 'error'>

    const error = vi.fn()
    const warn = vi.fn()

    const handlers = { error, warn }

    function handleLogs(logs: { [key in ProdLog]: number }) {
      for (const log of _.ownPropertyNames(logs)) {
        handlers[log]()
      }
    }

    const logs: { [key in FullLog]: number } = {
      error: 1,
      warn: 2,
      info: 3,
      debug: 4,
    }

    handleLogs(logs)

    expect(error).toHaveBeenCalledTimes(1)
    expect(warn).toHaveBeenCalledTimes(1)
  })
})
