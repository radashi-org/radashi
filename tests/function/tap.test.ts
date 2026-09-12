import * as _ from 'radashi'

describe('tap', () => {
  it('executes the provided function with the given value', () => {
    let calledValue = null
    const obj = { a: 1 }

    _.tap(obj, value => {
      calledValue = value
    })

    expect(calledValue).toBe(obj)
  })

  it('returns the original value', () => {
    const obj = { a: 1 }
    const result = _.tap(obj, () => {})

    expect(result).toBe(obj)
  })

  it('allows mutation of the value inside the callback', () => {
    const obj = { a: 1 }

    const result = _.tap(obj, value => {
      value.a += 1
    })

    expect(result).toEqual({ a: 2 })
  })

  it('works with arrays and allows modifications inside the callback', () => {
    const arr = [1, 2, 3]

    const result = _.tap(arr, value => {
      value.push(4)
    })

    expect(result).toEqual([1, 2, 3, 4])
  })
})
