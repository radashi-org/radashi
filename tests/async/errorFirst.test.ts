import { errorFirst } from 'radashi'

test('resolves with [null, value] when the promise resolves', async () => {
  const promise = Promise.resolve('value')
  const result = await errorFirst(promise)
  expect(result).toEqual([null, 'value'])
})

test('rejects with [error, null] when the promise rejects', async () => {
  const promise = Promise.reject(new Error('error'))
  const result = await errorFirst(promise)
  expect(result).toEqual([new Error('error'), null])
})

test('calls the function and resolves with [null, value] when the function resolves', async () => {
  const fn = async () => 'value'
  const result = await errorFirst(fn)
  expect(result).toEqual([null, 'value'])
})

test('calls the function and rejects with [error, null] when the function rejects', async () => {
  const fn = async () => {
    throw new Error('error')
  }
  const result = await errorFirst(fn)
  expect(result).toEqual([new Error('error'), null])
})

test('calls the function and rejects with [error, null] when the function throws synchronously', async () => {
  const fn = () => {
    throw new Error('error')
  }
  const result = await errorFirst(fn)
  expect(result).toEqual([new Error('error'), null])
})
