import * as _ from 'radashi'

describe('memoLastCall', () => {
  test('caches the last result', () => {
    let calculationCount = 0
    const expensiveCalculation = (x: number, y: number): { result: number } => {
      calculationCount++
      return { result: x + y }
    }

    const memoizedCalc = _.memoLastCall(expensiveCalculation)

    const firstCall = memoizedCalc(2, 3)
    expect(firstCall).toEqual({ result: 5 })
    expect(calculationCount).toBe(1)

    const secondCall = memoizedCalc(2, 3)
    expect(secondCall).toBe(firstCall) // Check memoization
    expect(calculationCount).toBe(1)

    const thirdCall = memoizedCalc(3, 4)
    expect(thirdCall).toEqual({ result: 7 })
    expect(thirdCall).not.toBe(firstCall) // Check cache was overwritten
    expect(calculationCount).toBe(2)

    const fourthCall = memoizedCalc(2, 3)
    expect(fourthCall).toEqual({ result: 5 })
    expect(fourthCall).not.toBe(firstCall) // Check previous cache was overwritten
    expect(calculationCount).toBe(3)
  })

  test('handles different argument types', () => {
    const memoizedFn = _.memoLastCall((a: string, b: number, c: boolean) => ({
      value: `${a}-${b}-${c}`,
    }))
    const firstCall = memoizedFn('foo', 123, true)
    expect(firstCall).toEqual({ value: 'foo-123-true' })
    expect(memoizedFn('foo', 123, true)).toBe(firstCall)
    const secondCall = memoizedFn('bar', 456, false)
    expect(secondCall).toEqual({ value: 'bar-456-false' })
    expect(secondCall).not.toBe(firstCall)
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
