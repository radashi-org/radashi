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
  expect((result[0] as Error).message).toEqual('test error')
  expect(result[1]).toBeUndefined()
})

test('converts a rejected promise with a non-error to Err', async () => {
  const promise = Promise.reject('test error')
  const result = await _.toResult(promise)
  expect(result[0]).toBeInstanceOf(Error)
  expect((result[0] as Error).message).toEqual('test error')
  expect(result[1]).toBeUndefined()
})
