import * as _ from 'radashi'
import { expect, test } from 'vitest'

test('converts a resolved promise to Ok', async () => {
  const promise = Promise.resolve(1)
  const result = await _.toResult(promise)
  expect(result).toEqual([undefined, 1])
})

test('converts a rejected promise to Err', async () => {
  const promise = Promise.reject(new Error('test error'))
  const result = await _.toResult(promise)
  expect(result[0]).toBeInstanceOf(Error)
  expect(result[0]!.message).toEqual('test error')
  expect(result[1]).toBeUndefined()
})

test('converts a rejected promise with a non-error to Err', async () => {
  const promise = Promise.reject('test error')
  const result = await _.toResult(promise)
  expect(result[0]).toBeInstanceOf(Error)
  expect(result[0]!.message).toEqual('test error')
  expect(result[1]).toBeUndefined()
})

test('does not catch synchronous errors', () => {
  const shouldThrow = true
  expect(() => {
    const fn = () => {
      if (shouldThrow) {
        // This error is thrown synchronously, not as a rejected promise
        throw new Error('synchronous error')
      }
      return Promise.resolve(1)
    }

    // The following line will throw immediately, not returning a Result
    _.toResult(fn())
  }).toThrow('synchronous error')
})
