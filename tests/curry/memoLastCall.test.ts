import * as _ from 'radashi'

describe('memoLastCall', () => {
  test('caches the last result', () => {
    let callCount = 0
    const expensiveCalculation = (x: number, y: number): { result: number } => {
      callCount++
      return { result: x + y }
    }

    const memoizedCalc = _.memoLastCall(expensiveCalculation)

    const firstCall = memoizedCalc(2, 3)
    expect(firstCall).toEqual({ result: 5 })
    expect(callCount).toBe(1)

    let nextCall = memoizedCalc(2, 3)
    expect(nextCall).toBe(firstCall) // Check memoization
    expect(callCount).toBe(1)

    nextCall = memoizedCalc(3, 4)
    expect(nextCall).toEqual({ result: 7 })
    expect(nextCall).not.toBe(firstCall) // Check cache was overwritten
    expect(callCount).toBe(2)

    nextCall = memoizedCalc(2, 3)
    expect(nextCall).toEqual({ result: 5 })
    expect(nextCall).not.toBe(firstCall) // Check previous cache was overwritten
    expect(callCount).toBe(3)
  })

  test('handles different argument types', () => {
    const memoizedFn = _.memoLastCall((a: string, b: number, c: boolean) => ({
      value: `${a}-${b}-${c}`,
    }))

    const firstCall = memoizedFn('foo', 123, true)
    expect(firstCall).toEqual({ value: 'foo-123-true' })

    let nextCall = memoizedFn('foo', 123, true)
    expect(nextCall).toBe(firstCall)

    nextCall = memoizedFn('bar', 456, false)
    expect(nextCall).toEqual({ value: 'bar-456-false' })
    expect(nextCall).not.toBe(firstCall)
  })

  test('handles functions with no arguments', () => {
    let callCount = 0
    const memoizedFn = _.memoLastCall(() => {
      callCount++
      return { value: 'result' + callCount }
    })

    const firstCall = memoizedFn()
    expect(firstCall).toEqual({ value: 'result1' })
    expect(callCount).toBe(1)

    expect(memoizedFn()).toBe(firstCall)
    expect(callCount).toBe(1)
  })
})
