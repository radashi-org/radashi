import * as _ from 'radashi'

describe('cluster', () => {
  test('returns an array of arrays', () => {
    const list = [1, 1, 1, 1, 1, 1, 1, 1]
    const result = _.cluster(list)
    const [a, b, c] = result
    expect(a).toEqual([1, 1])
    expect(b).toEqual([1, 1])
    expect(c).toEqual([1, 1])
  })

  test('returns remainder in final cluster', () => {
    const list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2]
    const result = _.cluster(list, 3)
    const [a, b, c, d] = result
    expect(a).toEqual([1, 1, 1])
    expect(b).toEqual([1, 1, 1])
    expect(c).toEqual([1, 1, 1])
    expect(d).toEqual([2, 2])
  })

  test('handles empty array', () => {
    const result = _.cluster([], 2);
    expect(result).toEqual([]);
  });

  test('creates individual clusters when size is 1', () => {
    const list = [1, 2, 3, 4];
    const result = _.cluster(list, 1);
    expect(result).toEqual([[1], [2], [3], [4]]);
  });

  test('creates a single cluster when size exceeds array length', () => {
    const list = [1, 2, 3];
    const result = _.cluster(list, 5);
    expect(result).toEqual([[1, 2, 3]]);
  });

  test('returns empty list when size <= 0', () => {
    const expectedResult: number[] = []
    const list = [1, 2, 3, 4];

    const actualResult1 = _.cluster(list, 0);
    const actualResult2 = _.cluster(list, -1);
    const actualResult3 = _.cluster(list, Number.NEGATIVE_INFINITY);

    expect(actualResult1).toEqual(expectedResult);
    expect(actualResult2).toEqual(expectedResult);
    expect(actualResult3).toEqual(expectedResult);
  });

  test('uses default size of 2 when no size provided', () => {
    const list = [1, 2, 3, 4, 5];
    const actualResult = _.cluster(list);
    expect(actualResult).toEqual([[1, 2], [3, 4], [5]]);
  });

  test('handles arrays with mixed data types', () => {
    const list = [1, 'a', true, {}, null];
    const actualResult = _.cluster(list, 2);
    expect(actualResult).toEqual([[1, 'a'], [true, {}], [null]]);
  });

  test('handles very large size values', () => {
    const list = [1, 2, 3];
    const actualResult = _.cluster(list, Number.MAX_SAFE_INTEGER);
    expect(actualResult).toEqual([[1, 2, 3]]);
  });
})
