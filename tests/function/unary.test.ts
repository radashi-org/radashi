import * as _ from 'radashi'

describe('unary', () => {
  test('should receive only first argument', () => {
    const expectedAcceptedArgumentAmount = 1
    const expectedAcceptedArg = 111

    const spy = vi.fn((...args) => args)
    const unarySpy = _.unary(spy)

    // @ts-expect-error - Intentionally passing more args than the type expects
    unarySpy(expectedAcceptedArg, 222, 333, 444)
    const actualAcceptedArgumentAmount = spy.mock.calls[0].length

    expect(spy).toHaveBeenCalledWith(expectedAcceptedArg)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(actualAcceptedArgumentAmount).toBe(expectedAcceptedArgumentAmount)
  })

  test('should preserve return value of the original function', () => {
    const expectedResult = 10
    const unaryDouble = _.unary(mockDouble)
    function mockDouble(x: number, plusY?: number): number {
      return plusY !== undefined ? (x + plusY) * 2 : x * 2
    }

    // @ts-expect-error - Intentionally passing more args than the type expects
    const actualResult = unaryDouble(5, 2)

    expect(mockDouble(5, 2)).toBe(14)
    expect(actualResult).toBe(expectedResult)
  })

  test('should solve the parseInt issue with map', () => {
    const expectedStandardResult = [1, Number.NaN, Number.NaN]
    const expectedUnaryResult = [1, 2, 3]

    const actualStandardResult = ['1', '2', '3'].map(Number.parseInt)
    const unaryResult = ['1', '2', '3'].map(_.unary(Number.parseInt))

    expect(actualStandardResult).toEqual(expectedStandardResult)
    expect(unaryResult).toEqual(expectedUnaryResult)
  })

  test('should work with JSON.parse', () => {
    const jsonStrings = ['{"name":"Alice"}', '{"name":"Bob"}']
    const expectedResult = [{ name: 'Alice' }, { name: 'Bob' }]

    const actualResult = jsonStrings.map(_.unary(JSON.parse))

    expect(actualResult).toEqual(expectedResult)
  })

  test('should work with function that expects only one argument', () => {
    const expectedResult = 'Hello, World!'

    const greet = (name: string, ...args: any[]) => `Hello, ${name}!`
    const unaryGreet = _.unary(greet)

    // @ts-expect-error - Intentionally passing more args than the type expects
    expect(unaryGreet('World', '1', '2', '3')).toBe(expectedResult)
    expect(unaryGreet('World')).toBe(expectedResult)
  })
})
