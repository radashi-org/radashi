import vm from 'node:vm'
import * as _ from 'radashi'

const symbolKey = Symbol('symKey')
const sharedFunction = () => true

describe('isEqual', () => {
  test('returns true for equal primitives', () => {
    expect(_.isEqual(0, 0)).toBe(true)
    expect(_.isEqual('a', 'a')).toBe(true)
    expect(_.isEqual(true, true)).toBe(true)
  })

  test('returns true for equal symbols', () => {
    const hello = Symbol('hello')
    expect(_.isEqual(hello, hello)).toBe(true)
    expect(_.isEqual(Symbol.for('hello'), Symbol.for('hello'))).toBe(true)
  })

  test('returns true for equal plain objects', () => {
    expect(_.isEqual({}, {})).toBe(true)
    expect(_.isEqual({ a: 1 }, { a: 1 })).toBe(true)
  })

  test('returns true for equal regular expressions', () => {
    expect(_.isEqual(/a*s/, /a*s/)).toBe(true)
  })

  test('returns true for equal dates', () => {
    const now = new Date()
    expect(_.isEqual(now, now)).toBe(true)
  })

  test('returns true for equal arrays', () => {
    expect(_.isEqual([], [])).toBe(true)
    expect(_.isEqual([1], [1])).toBe(true)
  })

  test('checks for deep object equality', () => {
    const obj = { a: { b: { c: 1 } } }
    const obj2 = structuredClone(obj)
    expect(_.isEqual(obj, obj2)).toBe(true)
    obj2.a.b.c = 2
    expect(_.isEqual(obj, obj2)).toBe(false)
  })

  test('checks for deep array equality', () => {
    const arr = [1, [2, [3]]] as [number, [number, [number]]]
    const arr2 = structuredClone(arr)
    expect(_.isEqual(arr, arr2)).toBe(true)
    arr2[1][1][0] = 4
    expect(_.isEqual(arr, arr2)).toBe(false)
  })

  test('returns true for prototype-less objects with same keys and values', () => {
    const obj = Object.create(null)
    obj.a = 1
    obj.b = 2
    const obj2 = Object.create(null)
    obj2.a = 1
    obj2.b = 2
    expect(_.isEqual(obj, obj2)).toBe(true)
  })

  test('returns false for primitives of different values', () => {
    expect(_.isEqual(0, 1)).toBe(false)
    expect(_.isEqual('a', 'b')).toBe(false)
    expect(_.isEqual(true, false)).toBe(false)
  })

  test('returns false for symbols created separately', () => {
    expect(_.isEqual(Symbol('hello'), Symbol('hello'))).toBe(false)
  })

  test('returns false for objects with different properties', () => {
    expect(_.isEqual({ a: 1 }, { a: 2 })).toBe(false)
    expect(_.isEqual({ a: 1 }, { b: 1 })).toBe(false)
  })

  test('returns false for different regular expressions', () => {
    expect(_.isEqual(/^http:/, /https/)).toBe(false)
    expect(_.isEqual(/../g, /../)).toBe(false)
  })

  test('returns false for dates with different values', () => {
    expect(_.isEqual(new Date(), new Date('2022-09-01T03:25:12.750Z'))).toBe(
      false,
    )
  })

  test('returns false for arrays with different contents', () => {
    expect(_.isEqual([], [1])).toBe(false)
    expect(_.isEqual([1], [2])).toBe(false)
  })

  test('returns false when comparing RegExp with plain object', () => {
    expect(_.isEqual(/a/, { lastIndex: 0 } as any)).toBe(false)
  })

  test('returns false when comparing Date with empty object', () => {
    expect(_.isEqual(new Date(0), {} as any)).toBe(false)
  })

  test('returns false for objects with different constructors', () => {
    expect(_.isEqual({}, Object.create(null))).toBe(false)
    expect(_.isEqual({}, [])).toBe(false)
  })

  test('returns false for missing key even if values are undefined', () => {
    expect(_.isEqual({ a: undefined }, { b: undefined })).toBe(false)
  })

  test('returns false for object with too many keys', () => {
    expect(_.isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    expect(_.isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false)
  })

  describe('custom compare function', () => {
    test('called for maps', () => {
      const map1 = new Map([[1, 'a']])
      const map2 = new Map([[1, 'a']])
      const spy = vi.fn(() => true)
      expect(_.isEqual(map1, map2, spy)).toBe(true)
      expect(spy).toHaveBeenCalledWith(map1, map2)
    })

    test('called for sets', () => {
      const set1 = new Set([1, 2])
      const set2 = new Set([1, 2])
      const spy = vi.fn(() => true)
      expect(_.isEqual(set1, set2, spy)).toBe(true)
      expect(spy).toHaveBeenCalledWith(set1, set2)
    })

    test('called for custom class instances', () => {
      class Foo {
        constructor(public x: number) {}
      }
      const foo1 = new Foo(1)
      const foo2 = new Foo(1)
      const spy = vi.fn(() => true)
      expect(_.isEqual(foo1, foo2, spy)).toBe(true)
      expect(spy).toHaveBeenCalledWith(foo1, foo2)
    })

    test('may return null (default to built-in behavior)', () => {
      class Bar {
        constructor(public y: number) {}
      }
      const bar1 = new Bar(2)
      const bar2 = new Bar(2)
      const spy = vi.fn(() => null)
      expect(_.isEqual(bar1, bar2, spy)).toBe(true)
      expect(spy).toHaveBeenCalledWith(bar1, bar2)
    })

    test('not called for plain object comparison', () => {
      const obj1 = { a: 1 }
      const obj2 = { a: 1 }
      const spy = vi.fn()
      expect(_.isEqual(obj1, obj2, spy)).toBe(true)
      expect(spy).not.toHaveBeenCalled()
    })

    test('not called for primitive comparison', () => {
      const spy = vi.fn()
      expect(_.isEqual(1, 1, spy)).toBe(true)
      expect(spy).not.toHaveBeenCalled()
    })

    test('not called for array comparison', () => {
      const arr1 = [1, 2, 3]
      const arr2 = [1, 2, 3]
      const spy = vi.fn()
      expect(_.isEqual(arr1, arr2, spy)).toBe(true)
      expect(spy).not.toHaveBeenCalled()
    })

    test('not called for date comparison', () => {
      const date1 = new Date(123)
      const date2 = new Date(123)
      const spy = vi.fn()
      expect(_.isEqual(date1, date2, spy)).toBe(true)
      expect(spy).not.toHaveBeenCalled()
    })

    test('not called for regexp comparison', () => {
      const re1 = /abc/gi
      const re2 = /abc/gi
      const spy = vi.fn()
      expect(_.isEqual(re1, re2, spy)).toBe(true)
      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('unsupported cases', () => {
    test('sparse arrays', () => {
      // biome-ignore lint/suspicious/noSparseArray:
      expect(_.isEqual([1, , 3], [1, 2, 3])).toBe(true)
    })

    test('objects from different realms', () => {
      const context = vm.createContext()
      // Create an object in the VM context (different realm)
      const objFromVm = vm.runInContext('({ a: 1 })', context)
      // Create a similar object in the main context
      const obj = { a: 1 }
      // They should not be considered equal due to different realms (constructors differ)
      expect(_.isEqual(obj, objFromVm)).toBe(false)
    })
  })
})
