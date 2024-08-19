import * as _ from 'radashi'

describe('clone', () => {
  test('copies the primitives', () => {
    const arr = [
      1.1,
      'How you doing?',
      false,
      Symbol('key'),
      BigInt('1'),
      undefined,
      null,
    ]
    for (const elm of arr) {
      const newElm = _.clone(elm)
      expect(elm).toBe(newElm)
    }
  })
  test('copies arrays', () => {
    const arr = [{ a: 0 }, 1, 2, 3]
    const result = _.clone(arr)

    expect(arr).not.toBe(result)
    for (const i in result) {
      expect(arr[i]).toBe(result[i])
    }
  })
  test('copies functions', () => {
    const fa = () => 0
    const fb = _.clone(fa)

    expect(fa).not.toBe(fb)
    expect(fa()).toBe(fb())
  })
  test('copies objects (class instances) without losing the class type', () => {
    class Data {
      val = 0
    }

    const obj = new Data()
    obj.val = 1
    const result = _.clone(obj)

    expect(obj).not.toBe(result)
    expect(obj.constructor.name).toBe(result.constructor.name)
    expect(obj.val).toBe(result.val)
  })
  test('copies all attributes from object', () => {
    const obj = {
      x: 22,
      add: (a: number, b: number) => a + b,
      child: {
        key: 'yolo',
      },
    }
    const result = _.clone(obj)
    expect(result.x).toBe(obj.x)
    expect(result.add(2, 2)).toBe(obj.add(2, 2))
    expect(result.child.key).toBe(obj.child.key)
  })
  test('copies all attributes from class instance', () => {
    class Data {
      public x = 22
      public add(a: number, b: number) {
        return a + b
      }
      public child: any = {
        key: 'yolo',
      }
    }
    const result = _.clone(new Data())
    expect(result.x).toBe(22)
    // @warning will not copy functions from class instance
    // expect(result.add(2, 2)).toBe(4)
    expect(result.child.key).toBe('yolo')
  })
  test('copies object created with Object.create(null)', () => {
    const obj = Object.create(null)
    obj.x = 22
    const result = _.clone(obj)
    expect(Object.getPrototypeOf(result)).toBe(null)
    expect(result.x).toBe(22)
  })
})
