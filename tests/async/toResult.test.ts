import * as _ from 'radashi'
import { expect, test } from 'vitest'

test('converts a resolved promise to Ok', async () => {
  const promise = Promise.resolve(1)
  const result = await _.toResult(promise)
  expect(result).toEqual({ ok: true, value: 1, error: undefined })
})

test('converts a rejected promise to Err', async () => {
  const promise = Promise.reject(new Error('test error'))
  const result = await _.toResult(promise)
  expect(result.error).toBeInstanceOf(Error)
  expect(result.error!.message).toEqual('test error')
  expect(result.value).toBeUndefined()
})

test('rethrows non-Error rejections', async () => {
  const promise = Promise.reject('test error')
  await expect(_.toResult(promise)).rejects.toBe('test error')
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
