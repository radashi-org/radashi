import * as _ from 'radashi'

describe('traverse', () => {
  test('traverse all properties of a plain object', () => {
    const obj = { a: 1, b: { c: 2 } }

    const visited: [keyof any, unknown][] = []
    _.traverse(obj, (value, key) => {
      visited.push([key, value])
    })

    expect(visited).toEqual([
      ['a', 1],
      ['b', { c: 2 }],
      ['c', 2],
    ])
  })

  test('traverse all elements of an array', () => {
    const arr = [1, [2, 3]]

    const visited: [keyof any, unknown][] = []
    _.traverse(arr, (value, key) => {
      visited.push([key, value])
    })

    expect(visited).toEqual([
      [0, 1],
      [1, [2, 3]],
      [0, 2],
      [1, 3],
    ])
  })

  test('stop traversal when visitor returns false', () => {
    const obj = { a: 1, b: { c: 2 } }

    const visited: [keyof any, unknown][] = []
    _.traverse(obj, (value, key) => {
      visited.push([key, value])
      if (key === 'b') {
        return false
      }
    })

    expect(visited).toEqual([
      ['a', 1],
      ['b', { c: 2 }],
    ])
  })

  test('skip traversal of an object when context.skip is called', () => {
    const obj = { a: 1, b: { c: 2 } }

    const visited: [keyof any, unknown][] = []
    _.traverse(obj, (value, key, parent, context) => {
      visited.push([key, value])
      if (key === 'b') {
        context.skip()
      }
    })

    expect(visited).toEqual([
      ['a', 1],
      ['b', { c: 2 }],
    ])
  })

  test('traverse non-enumerable properties when ownKeys is customized', () => {
    const obj: Record<string | symbol, unknown> = { a: 1 }
    Object.defineProperty(obj, 'b', { value: 2, enumerable: false })
    const symbolKey = Symbol('key')
    obj[symbolKey] = 3

    const visited: [keyof any, unknown][] = []
    _.traverse(
      obj,
      (value, key) => {
        visited.push([key, value])
      },
      { ownKeys: Reflect.ownKeys },
    )

    expect(visited).toEqual([
      ['a', 1],
      ['b', 2],
      [symbolKey, 3],
    ])
  })

  test('traverse a root iterable (e.g., Map)', () => {
    const map = new Map<string, unknown>([
      ['a', 1],
      ['b', { c: 2 }],
    ])

    const visited: [keyof any, unknown][] = []
    _.traverse(map, (value, key) => {
      visited.push([key, value])
    })

    expect(visited).toEqual([
      ['a', 1],
      ['b', { c: 2 }],
      ['c', 2],
    ])
  })

  test('traverse nested objects and arrays combined', () => {
    const obj = { a: [1, { b: 2 }], c: 3 }

    const visited: [keyof any, unknown][] = []
    _.traverse(obj, (value, key) => {
      visited.push([key, value])
    })

    expect(visited).toEqual([
      ['a', [1, { b: 2 }]],
      [0, 1],
      [1, { b: 2 }],
      ['b', 2],
      ['c', 3],
    ])
  })

  test('traverse a sparse array', () => {
    // biome-ignore lint/suspicious/noSparseArray:
    const arr = [1, , 3]
    arr[5] = 5

    const visited: [keyof any, unknown][] = []
    _.traverse(arr, (value, key) => {
      visited.push([key, value])
    })

    expect(visited).toEqual([
      [0, 1],
      [2, 3],
      [5, 5],
    ])
  })

  test('traverse a root Set', () => {
    const set = new Set([1, { a: 2 }])

    const visited: [keyof any, unknown][] = []
    _.traverse(set, (value, key) => {
      visited.push([key, value])
    })

    expect(visited).toEqual([
      [0, 1],
      [1, { a: 2 }],
      ['a', 2],
    ])
  })

  test('skip traversal of specific nested objects', () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } } }

    const visited: [keyof any, unknown][] = []
    _.traverse(obj, (value, key, _parent, context) => {
      visited.push([key, value])
      if (key === 'd') {
        context.skip()
      }
    })

    expect(visited).toEqual([
      ['a', 1],
      ['b', { c: 2, d: { e: 3 } }],
      ['c', 2],
      ['d', { e: 3 }],
    ])
  })

  test('return early from traversal due to a specific condition', () => {
    const obj = { a: 1, b: 2, c: 3 }

    const visited: [keyof any, unknown][] = []
    _.traverse(obj, (value, key) => {
      visited.push([key, value])
      if (value === 2) {
        return false
      }
    })

    expect(visited).toEqual([
      ['a', 1],
      ['b', 2],
    ])
  })

  test('return early while traversing a nested array', () => {
    const arr = [1, [2, 3, [4]]]

    const visited: [keyof any, unknown][] = []
    _.traverse(arr, (value, key) => {
      visited.push([key, value])
      if (value === 2) {
        return false
      }
    })

    expect(visited).toEqual([
      [0, 1],
      [1, [2, 3, [4]]],
      [0, 2],
    ])
  })

  test('return early while traversing a non-array iterable', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ])

    const visited: [keyof any, unknown][] = []
    _.traverse(map, (value, key) => {
      visited.push([key, value])
      if (value === 2) {
        return false
      }
    })

    expect(visited).toEqual([
      ['a', 1],
      ['b', 2],
    ])
  })

  test('handle objects with circular references', () => {
    const obj: Record<string, unknown> = { a: 1 }
    obj.b = obj

    const visited: [keyof any, unknown][] = []
    _.traverse(obj, (value, key) => {
      visited.push([key, value])
    })

    expect(visited).toEqual([
      ['a', 1],
      ['b', obj],
    ])
  })

  test('handle non-plain objects (e.g., class instances)', () => {
    class MyClass {
      constructor(
        public a: unknown,
        public b: unknown,
      ) {}
    }

    const instance = new MyClass(1, { c: 2 })

    const visited: [keyof any, unknown][] = []
    _.traverse(instance, (value, key) => {
      visited.push([key, value])
    })

    expect(visited).toEqual([
      ['a', 1],
      ['b', { c: 2 }],
      ['c', 2],
    ])
  })

  test('call traverse from within a visitor', () => {
    const nestedMap = new Map([['c', 2]])
    const map = new Map<string, unknown>([
      ['a', 1],
      ['b', nestedMap],
    ])

    const visited: [(keyof any)[], unknown][] = []
    _.traverse(map, function visitor(value, _key, _parent, context, options) {
      visited.push([[...context.path], value])
      if (value instanceof Map) {
        _.traverse(value, visitor, options, context)
      }
    })

    expect(visited).toEqual([
      [['a'], 1],
      [['b'], nestedMap],
      [['b', 'c'], 2],
    ])
  })

  test('ensure path and parents properties are correctly maintained', () => {
    const obj = { a: { b: 2 } }
    const paths: (keyof any)[][] = []
    const parents: unknown[][] = []
    _.traverse(obj, (_value, _key, _parent, ctx) => {
      paths.push([...ctx.path])
      parents.push([...ctx.parents])
    })
    expect(paths).toEqual([['a'], ['a', 'b']])
    expect(parents).toEqual([[obj], [obj, obj.a]])
  })

  test('visitor can return a leave callback', () => {
    const obj = { a: { b: 2 } }
    const visited: [keyof any, unknown][] = []
    _.traverse(obj, (value, key) => {
      visited.push([key, value])
      return () => {
        visited.push([key, value])
      }
    })
    expect(visited).toEqual([
      ['a', { b: 2 }],
      ['b', 2],
      ['a', { b: 2 }],
    ])
  })

  test('leave callback that returns false', () => {
    const obj = { a: { b: { type: 'b' }, c: { type: 'c' } } }
    const visited: [keyof any, unknown][] = []
    _.traverse(obj, (value, key) => {
      visited.push([key, value])
      return () => {
        visited.push([key, value])
        // Stop traversing once an object is fully traversed.
        return false
      }
    })
    expect(visited).toEqual([
      ['a', obj.a],
      ['b', obj.a.b],
      ['type', 'b'],
      ['b', obj.a.b],
    ])
  })

  test('rootNeedsVisit=true with early exit', () => {
    const obj = { a: { b: 1 } }
    const visited: [keyof any | null, unknown][] = []
    _.traverse(
      obj,
      (value, key) => {
        visited.push([key, value])
        return false
      },
      { rootNeedsVisit: true },
    )
    expect(visited).toEqual([[null, obj]])
  })

  test('rootNeedsVisit=true with leave callback', () => {
    const obj = { a: 1 }
    const visited: [keyof any | null, unknown][] = []
    _.traverse(
      obj,
      (value, key) => {
        visited.push([key, value])
        return () => {
          visited.push([key, value])
        }
      },
      { rootNeedsVisit: true },
    )
    expect(visited).toEqual([
      [null, obj],
      ['a', obj.a],
      [null, obj],
    ])
  })

  test('nested traverse with skipped root', () => {
    class Random {
      value = Math.random()
    }
    const obj = { r: new Random() }
    const visited: [keyof any | null, unknown][] = []
    _.traverse(
      obj,
      function visitor(value, key, _parent, context) {
        visited.push([key, value])
        if (key === null) {
          context.skip(obj.r)
        } else if (value instanceof Random) {
          // This is a no-op since `obj.r` was skipped.
          _.traverse(value, visitor, null, context)
        }
      },
      { rootNeedsVisit: true },
    )
    // The `Random::value` instance property shouldn't be visited
    // since `context.skip` was called with the Random instance.
    expect(visited).toEqual([
      [null, obj],
      ['r', obj.r],
    ])
  })
})
