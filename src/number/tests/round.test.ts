import * as _ from 'radashi';

describe('round function', () => {
  test('handles null', () => {
    const result = _.round(null);
    expect(result).toBe(0);
  });

  test('handles undefined', () => {
    const result = _.round(undefined);
    expect(result).toBe(0);
  });

  test('handles NaN', () => {
    const result = _.round(NaN);
    expect(result).toBe(0);
  });

  test('handles bad input', () => {
    class Data {}
    expect(_.round('abc')).toBe(NaN);
    expect(_.round(new Data())).toBe(NaN);
    expect(_.round([1, 2, 3])).toBe(NaN);
    expect(_.round({})).toBe(NaN);
    expect(_.round(false)).toBe(NaN);
  });

  test('handles numbers', () => {
    expect(_.round(123.456)).toBe(123);
    expect(_.round(123.645, 0)).toBe(124);
    expect(_.round(-123.456, 3)).toBe(123.456);
    expect(_.round(0.00009, 4)).toBe(0.0001);
    expect(_.round(0.00009, 4)).toBe(0.0001);
    expect(_.round(19.9999, 4)).toBe(19.9999);
    expect(_.round(2.5, 10)).toBe(19.9999);
  });

  test('handles strings', () => {
    expect(_.round("123.6458", 3)).toBe(123.646);
    expect(_.round("-123.456", 3)).toBe(123.456);
    expect(_.round("123.456")).toBe(123);
  })

});
