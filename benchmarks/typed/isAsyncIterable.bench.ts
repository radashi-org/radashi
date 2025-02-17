import { isAsyncIterable } from 'radashi'
import { bench, describe } from 'vitest'

describe('isAsyncIterable', () => {
  const array = [1, 2, 3]
  const asyncIterable = (async function* () {
    yield 1
  })()

  bench('async iterable', () => {
    isAsyncIterable(asyncIterable)
  })

  bench('non-async iterable', () => {
    isAsyncIterable(array)
  })
})
