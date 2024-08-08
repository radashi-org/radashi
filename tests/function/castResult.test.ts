import * as _ from 'radashi'

describe('_.castResult', () => {
  test('primitive as input', () => {
    const result = _.castResult(null, 'hello')
    expect(result).toEqual([undefined, 'hello'])
  })

  test('error as input', () => {
    const result = _.castResult(new TypeError('hello'))
    expect(result).toEqual([new TypeError('hello'), undefined])
  })

  test('resolved promise as input', async () => {
    const result = _.castResult(null, Promise.resolve('hello'))
    expect(result).toBeInstanceOf(Promise)
    await expect(result).resolves.toEqual([undefined, 'hello'])

    const result2 = _.castResult(Promise.resolve('hello'))
    expect(result2).toBeInstanceOf(Promise)
    await expect(result2).resolves.toEqual([undefined, 'hello'])

    const result3 = _.castResult(
      new TypeError('hello'),
      Promise.resolve('hello'),
    )
    expect(result3).toBeInstanceOf(Promise)
    await expect(result3).resolves.toEqual([new TypeError('hello'), undefined])
  })

  test('rejected promise as input', async () => {
    const result = _.castResult(Promise.reject(new TypeError('error')))
    await expect(result).resolves.toEqual([new TypeError('error'), undefined])

    const result2 = _.castResult(null, Promise.reject(new TypeError('error')))
    await expect(result2).resolves.toEqual([new TypeError('error'), undefined])
  })

  test('Result tuple as input', () => {
    // Result tuple as 2nd argument is wrapped in another Result tuple.
    const result = _.castResult(null, [undefined, 'hello'])
    expect(result).toEqual([undefined, [undefined, 'hello']])
  })

  test('Result promise as input', async () => {
    // This call receives a Result tuple as its 1st argument, which is
    // exactly what the returned promise will resolve with.
    const promise = Promise.resolve([undefined, 'hello'])
    const result = _.castResult(promise)
    expect(result).not.toBe(promise)
    await expect(result).resolves.toEqual([undefined, 'hello'])

    // This call receives a promise for a Result tuple as its 2nd argument, which is
    // exactly what the returned promise will resolve with.
    const promise2 = Promise.resolve([new Error(), undefined])
    const result2 = _.castResult(null, promise2)
    expect(result2).not.toBe(promise2)
    await expect(result2).resolves.toEqual([new Error(), undefined])

    // Invalid tuple is not used as a Result tuple.
    const promise3 = Promise.resolve<number[]>([1, 1])
    const result3 = _.castResult(null, promise3)
    expect(result3).not.toBe(promise3)
    await expect(result3).resolves.toEqual([undefined, [1, 1]])
  })

  test('castResult promise as input', () => {
    const promise1 = Promise.resolve('hello')
    const promise2 = _.castResult(promise1)
    const promise3 = _.castResult(promise2)

    expect(promise1).not.toBe(promise2)
    expect(promise2).toBe(promise3)
  })
})
