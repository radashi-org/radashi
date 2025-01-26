import * as _ from 'radashi'

describe('clone', () => {
  test('copies arrays', () => {
    const arr = [{ a: 0 }, 1, 2, 3]
    const result = _.clone(arr)

    expect(arr).not.toBe(result)
    for (const i in result) {
      expect(arr[i]).toBe(result[i])
    }
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
