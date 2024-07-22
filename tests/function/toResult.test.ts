import * as _ from 'radashi'

describe('_.toResult', () => {
  test('should return a Result tuple for non-promise values', () => {
    const result = _.toResult(null, 'hello')
    expect(result).toEqual([undefined, 'hello'])

    const result2 = _.toResult(new TypeError('hello'))
    expect(result2).toEqual([new TypeError('hello'), undefined])
  })

  test('should return a ResultPromise for promise values', async () => {
    const result = _.toResult(null, Promise.resolve('hello'))
    expect(result).toBeInstanceOf(Promise)
    await expect(result).resolves.toEqual([undefined, 'hello'])

    const result2 = _.toResult(Promise.resolve('hello'))
    expect(result2).toBeInstanceOf(Promise)
    await expect(result2).resolves.toEqual([undefined, 'hello'])

    const result3 = _.toResult(new TypeError('hello'), Promise.resolve('hello'))
    expect(result3).toBeInstanceOf(Promise)
    await expect(result3).resolves.toEqual([new TypeError('hello'), undefined])
  })

  test('should handle rejected promises correctly', async () => {
    const result = _.toResult(Promise.reject(new TypeError('error')))
    await expect(result).resolves.toEqual([new TypeError('error'), undefined])

    const result2 = _.toResult(null, Promise.reject(new TypeError('error')))
    await expect(result2).resolves.toEqual([new TypeError('error'), undefined])
  })

  test('should handle Result objects correctly', async () => {
    // This call receives a Result tuple as its 1st argument, which is
    // exactly what the returned promise will resolve with.
    const result = _.toResult(Promise.resolve([undefined, 'hello']))
    await expect(result).resolves.toEqual([undefined, 'hello'])

    // This call receives a promise for a Result tuple as its 2nd argument, which is
    // exactly what the returned promise will resolve with.
    const result2 = _.toResult(null, Promise.resolve([new Error(), undefined]))
    await expect(result2).resolves.toEqual([new Error(), undefined])

    // Invalid tuple is not used as a Result tuple.
    const result3 = _.toResult(null, Promise.resolve<number[]>([1, 1]))
    await expect(result3).resolves.toEqual([undefined, [1, 1]])
  })
})
