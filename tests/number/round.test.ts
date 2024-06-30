import * as _ from 'radashi'

describe('round function', () => {
  test('rounds to default precision (0 decimal places)', () => {
    expect(_.round(123.456)).toBe(123)
    expect(_.round(987.654321)).toBe(988)
    expect(_.round(0.123456789)).toBe(0)
  })

  test('rounds to specified precision', () => {
    expect(_.round(987.654, 3)).toBe(987.654)
    expect(_.round(1.01, 1000)).toBe(1.01)
    expect(_.round(1.005, 2)).toBe(1.01)
    expect(_.round(1.0049, 2)).toBe(1.0)
  })

  test('handles negative precisions', () => {
    expect(_.round(123.456, -1)).toBe(120)
    expect(_.round(123.456, -2)).toBe(100)
    expect(_.round(987.654, -2)).toBe(1000)
    expect(_.round(987.654, -1000)).toBe(0)
    expect(_.round(1.01, -1000)).toBe(0)
    expect(_.round(1.01, -324)).toBe(0)
  })

  test('handles negative numbers', () => {
    expect(_.round(-123.456, 2)).toBe(-123.46)
    expect(_.round(-987.654, 1)).toBe(-987.7)
    expect(_.round(-0.123456789, 6)).toBe(-0.123457)
  })

  test('handles zero input', () => {
    expect(_.round(0)).toBe(0)
    expect(_.round(0.000000001)).toBe(0)
  })

  test('rounds very small numbers close to zero', () => {
    expect(_.round(0.0000000001, 10)).toBe(0.0000000001)
    expect(_.round(0.00000000005, 10)).toBe(1e-10)
  })

  test('handles infinity and NaN', () => {
    expect(_.round(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY)
    expect(_.round(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY)
    expect(_.round(Number.NaN)).toBeNaN()
  })

  test('handles extremely large numbers', () => {
    expect(_.round(1e50)).toBe(1e50)
    expect(_.round(1.23456789e50, 5)).toBe(1.23456789e50)
    expect(_.round(1e50, -10)).toBe(1e50)
  })

  test('handles edge cases with large positive precision', () => {
    let inputs = Array.from(_.range(1, 16, e => 10 ** e))
    let actual = inputs.map(input => _.round(input, 309))
    expect(actual).toEqual(inputs)

    inputs = Array.from(_.range(-16, -1, e => 10 ** e))
    actual = inputs.map(input => _.round(input, 309))
    expect(actual).toEqual(inputs)
  })

  /**
   * The following tests were copied from the Lodash repo.
   *
   * Some behavior is unsupported and therefore commented out:
   *   - Coercion of string arguments to numbers
   *   - Coercion of fractional precision to an integer
   *   - Coercion of NaN precision to an integer
   *   - Preservation of -0
   */
  describe('lodash suite', () => {
    for (const strategy of [Math.round, Math.ceil, Math.floor]) {
      const round = (value: number, precision?: number) =>
        _.round(value, precision, strategy)

      const prefix = strategy.name + ': '
      const isCeil = strategy === Math.ceil
      const isFloor = strategy === Math.floor

      test(prefix + 'return a rounded number without a precision', () => {
        const actual = round(4.006)
        expect(actual).toBe(isCeil ? 5 : 4)
      })

      test(prefix + 'work with a precision of `0`', () => {
        const actual = round(4.006, 0)
        expect(actual).toBe(isCeil ? 5 : 4)
      })

      test(prefix + 'work with a positive precision', () => {
        let actual = round(4.016, 2)
        expect(actual).toBe(isFloor ? 4.01 : 4.02)

        actual = round(4.1, 2)
        expect(actual).toBe(4.1)
      })

      test(prefix + 'work with a negative precision', () => {
        const actual = round(4160, -2)
        expect(actual).toBe(isFloor ? 4100 : 4200)
      })

      // test(prefix + 'coerce `precision` to an integer', () => {
      //   let actual = round(4.006, Number.NaN)
      //   expect(actual).toBe(isCeil ? 5 : 4)
      //
      //   const expected = isFloor ? 4.01 : 4.02
      //
      //   actual = round(4.016, 2.6)
      //   expect(actual).toBe(expected)
      //
      //   actual = round(4.016, '+2')
      //   expect(actual).toBe(expected)
      // })

      test(prefix + 'work with exponential notation and `precision`', () => {
        const actual = round(5e1, 2)
        expect(actual).toEqual(50)

        // actual = func('5e', 1)
        // expect(actual).toEqual(Number.NaN)
        //
        // actual = func('5e1e1', 1)
        // expect(actual).toEqual(Number.NaN)
      })

      // test(prefix + 'preserve the sign of `0`', () => {
      //   const values: [number, number?][] = [
      //     [0],
      //     [-0],
      //     // ['0'],
      //     // ['-0'],
      //     [0, 1],
      //     [-0, 1],
      //     // ['0', 1],
      //     // ['-0', 1],
      //   ]
      //   const expected = [
      //     Number.POSITIVE_INFINITY,
      //     Number.NEGATIVE_INFINITY,
      //     // Number.POSITIVE_INFINITY,
      //     // Number.NEGATIVE_INFINITY,
      //     Number.POSITIVE_INFINITY,
      //     Number.NEGATIVE_INFINITY,
      //     // Number.POSITIVE_INFINITY,
      //     // Number.NEGATIVE_INFINITY,
      //   ]
      //
      //   const actual = values.map(args => 1 / round.apply(undefined, args))
      //
      //   expect(actual).toEqual(expected)
      // })

      test(prefix + "don't return `NaN` for large `precision` values", () => {
        // Sanity checks
        expect(1e-323).not.toBe(0)
        expect(1e308).not.toBe(Number.POSITIVE_INFINITY)
        // biome-ignore lint/correctness/noPrecisionLoss:
        expect([1e-324, 1e309]).toEqual([0, Number.POSITIVE_INFINITY])

        // Any negative precision below -323 would result in NaN, but we
        // limit the precision to avoid that.
        expect(round(Number.MIN_SAFE_INTEGER, -324)).toBe(
          isFloor ? Number.NEGATIVE_INFINITY : 0,
        )
        expect(round(Number.MAX_SAFE_INTEGER, -324)).toBe(
          isCeil ? Number.POSITIVE_INFINITY : 0,
        )

        // Any positive precision above 308 would result in NaN, but we
        // limit the precision to avoid that.
        expect(round(Number.MIN_SAFE_INTEGER, 309)).toBe(
          Number.MIN_SAFE_INTEGER + 1,
        )
        expect(round(Number.MAX_SAFE_INTEGER, 309)).toBe(
          Number.MAX_SAFE_INTEGER - 1,
        )
      })
    }
  })
})
