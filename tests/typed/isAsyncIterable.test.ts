import * as _ from 'radashi'

describe('isAsyncIterable', () => {
  test('returns true for async iterables', () => {
    expect(
      _.isAsyncIterable(
        (async function* () {
          yield 1
        })(),
      ),
    ).toBe(true)

    expect(
      _.isAsyncIterable({
        [Symbol.asyncIterator]: () => ({
          next: () => ({ done: true, value: undefined }),
        }),
      }),
    ).toBe(true)
  })

  test('returns false for non-async-iterables', () => {
    expect(_.isAsyncIterable([1, 2, 3])).toBe(false)
    expect(_.isAsyncIterable(1)).toBe(false)
    expect(_.isAsyncIterable({})).toBe(false)
    expect(_.isAsyncIterable(null)).toBe(false)
    expect(_.isAsyncIterable(undefined)).toBe(false)
  })
})
