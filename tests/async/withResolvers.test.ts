import * as _ from 'radashi'

describe('withResolvers', () => {
  test('resolves promise', async () => {
    const { resolve, promise } = _.withResolvers<number>()

    resolve(42)

    expect(await promise).toBe(42)
  })

  test('rejects promise', async () => {
    const { reject, promise } = _.withResolvers<number>()

    reject('Weird error')

    await expect(promise).rejects.toThrowError('Weird error')
  })
})
