import * as _ from 'radashi'

describe('unawaited', () => {
  test('returns undefined', () => {
    expect(_.unawaited(Promise.resolve())).toBe(undefined)
  })

  test('calls console.error when promise rejects', async () => {
    const error = new Error('test')
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const promise = Promise.reject(error)
    _.unawaited(promise)
    // We need to wait for the next tick to ensure the catch handler has been called
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(spy).toHaveBeenCalledWith(error)
    spy.mockRestore()
  })
})
