import * as _ from 'radashi';

describe('remove function', () => {
  it('removes elements that satisfy the predicate function', () => {
    const numbers = [1, 2, 3, 4, 5];
    const removed = _.remove(numbers, value => value % 2 === 0);
    expect(removed).toEqual([1, 3, 5]);
  });

  it('handles sparse arrays by skipping undefined elements', () => {
    const sparseArray = [1, , 3, , 5];
    const removed = _.remove(sparseArray, value => value === undefined);
    expect(removed).toEqual([1, 3, 5]);
  });

  it('returns an empty array when all elements are removed', () => {
    const numbers = [1, 2, 3, 4, 5];
    const removed = _.remove(numbers, () => true);
    expect(removed).toEqual([]);
  });

  it('retains all elements when no elements satisfy the predicate function', () => {
    const numbers = [1, 2, 3, 4, 5];
    const removed = _.remove(numbers, () => false);
    expect(removed).toEqual([1, 2, 3, 4, 5]);
  });

  it('works correctly with an empty array', () => {
    const emptyArray: number[] = [];
    const removed = _.remove(emptyArray, () => true);
    expect(removed).toEqual([]);
  });

  it('removes elements based on a more complex predicate function', () => {
    const objects = [
      { id: 1, active: true },
      { id: 2, active: false },
      { id: 3, active: true }
    ];
    const removed = _.remove(objects, obj => obj.active);
    expect(removed).toEqual([{ id: 2, active: false }]);
  });

  it('removes duplicate elements that satisfy the predicate function', () => {
    const numbers = [1, 2, 2, 3, 4, 4, 5];
    const removed = _.remove(numbers, value => value % 2 === 0);
    expect(removed).toEqual([1, 3, 5]);
  });

  it('does not mutate the original array', () => {
    const numbers = [1, 2, 3, 4, 5];
    _.remove(numbers, value => value % 2 === 0);
    expect(numbers).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns a new array even if no elements are removed', () => {
    const numbers = [1, 2, 3, 4, 5];
    const removed = _.remove(numbers, value => value > 10);
    expect(removed).not.toBe(numbers);
    expect(removed).toEqual([1, 2, 3, 4, 5]);
  });
});
