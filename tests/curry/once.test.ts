import * as _ from 'radashi'

describe('once', () => {
  test('the function is only invoked once', () => {
    let count = 0
    const fn = _.once(() => ++count)

    expect(fn()).toBe(1)
    expect(fn()).toBe(1)
    expect(fn()).toBe(1)
  })
  test('functions that return undefined are handled', () => {
    let count = 0
    const fn = _.once(() => {
      count++
    })

    expect(fn()).toBeUndefined()
    expect(fn()).toBeUndefined()
    expect(fn()).toBeUndefined()
    expect(count).toBe(1)
  })
  test('this is forwarded', () => {
    const fn = _.once(function () {
      return this
    })
    expect(fn.call(Math)).toBe(Math)
  })
})

describe('onceReset', () => {
  test('the result of the function is reset', () => {
    let count = 0
    const fn = _.once(() => count++)
    const firstResult = fn()
    _.onceReset(fn)
    expect(fn()).not.toBe(firstResult)
  })
})
