import * as _ from 'radashi'

describe('memoLastCall', () => {
  test('caches the last result', () => {
    let calculationCount = 0
    const expensiveCalculation = (x: number, y: number): number => {
      calculationCount++
      return x + y
    }

    const memoizedCalc = _.memoLastCall(expensiveCalculation)

    expect(memoizedCalc(2, 3)).toBe(5)
    expect(calculationCount).toBe(1)

    expect(memoizedCalc(2, 3)).toBe(5)
    expect(calculationCount).toBe(1)

    expect(memoizedCalc(3, 4)).toBe(7)
    expect(calculationCount).toBe(2)

    expect(memoizedCalc(2, 3)).toBe(5)
    expect(calculationCount).toBe(3)
  })

  test('handles different argument types', () => {
    const memoizedFn = _.memoLastCall(
      (a: string, b: number, c: boolean) => `${a}-${b}-${c}`,
    )
    expect(memoizedFn('foo', 123, true)).toBe('foo-123-true')
    expect(memoizedFn('foo', 123, true)).toBe('foo-123-true')
    expect(memoizedFn('bar', 456, false)).toBe('bar-456-false')
  })

  test('handles functions with no arguments', () => {
    let callCount = 0
    const memoizedFn = _.memoLastCall(() => {
      callCount++
      return 'result'
    })
    expect(memoizedFn()).toBe('result')
    expect(callCount).toBe(1)
    expect(memoizedFn()).toBe('result')
    expect(callCount).toBe(1)
  })
})
