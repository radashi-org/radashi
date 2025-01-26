import * as _ from 'radashi'

describe('clone', () => {
  test('copies arrays', () => {
    const arr = [{ a: 0 }, 1, 2, 3]
    const result = _.clone(arr)

    expect(arr).not.toBe(result)
    expect(arr).toEqual(result)
  })
  test('copies plain object in its entirety', () => {
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
  test('copies properties and prototype from class instance', () => {
    class Data {
      public x = 0
      public get y() {
        return this.x + 1
      }
      public add(a: number, b: number) {
        return a + b
      }
    }

    const data = new Data()
    data.x = 22

    const result = _.clone(data)
    expect(result).not.toBe(data)
    expect(result).toBeInstanceOf(Data)

    expect(result.x).toBe(22)
    expect(result.y).toBe(23)

    // biome-ignore lint/suspicious/noPrototypeBuiltins:
    expect(result.hasOwnProperty('add')).toBe(false)
    expect(result.add).toBe(Data.prototype.add)
  })
  test('copies object created with Object.create(null)', () => {
    const obj = Object.create(null)
    obj.x = 22
    const result = _.clone(obj)
    expect(Object.getPrototypeOf(result)).toBe(null)
    expect(result.x).toBe(22)
  })
})
