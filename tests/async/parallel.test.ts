import * as _ from 'radashi'

describe('parallel', () => {
  test('returns all results from all functions', async () => {
    const [errors, results] = await _.try(async () => {
      return _.parallel(1, _.list(1, 3), async num => {
        await _.sleep(0)
        return `hi_${num}`
      })
    })()
    expect(errors).toBeUndefined()
    expect(results).toEqual(['hi_1', 'hi_2', 'hi_3'])
  })

  test('throws errors as array of all errors', async () => {
    const [error, results] = await _.try(async () => {
      return _.parallel(1, _.list(1, 3), async num => {
        await _.sleep(0)
        if (num === 2) {
          throw new Error('number is 2')
        }
        return `hi_${num}`
      })
    })()
    const err = error as AggregateError
    expect(results).toBeUndefined()
    expect(err.errors.length).toBe(1)
    expect(err.errors[0].message).toBe('number is 2')
  })

  test('does not run more than the limit at once', async () => {
    let numInProgress = 0
    const tracking: number[] = []
    await _.parallel(3, _.list(1, 14), async () => {
      numInProgress++
      tracking.push(numInProgress)
      await _.sleep(0)
      numInProgress--
    })
    expect(Math.max(...tracking)).toBe(3)
  })

  test('abort before all iterations are complete', async () => {
    vi.useFakeTimers()

    const ctrl = new AbortController()

    // Abort in the middle of the 3rd iteration.
    setTimeout(() => ctrl.abort(), 25)

    const callback = vi.fn(() => _.sleep(10))
    const promise = _.parallel(
      {
        limit: 1,
        signal: ctrl.signal,
      },
      _.list(1, 10),
      callback,
    )
    promise.catch(_.noop)

    await vi.advanceTimersByTimeAsync(25)

    await expect(promise).rejects.toThrowError(
      new DOMException('This operation was aborted', 'AbortError'),
    )
    expect(callback).toHaveBeenCalledTimes(3)
  })

  test('abort before first iteration begins', async () => {
    const ctrl = new AbortController()
    ctrl.abort()

    const callback = vi.fn()
    await expect(
      _.parallel(
        {
          limit: 1,
          signal: ctrl.signal,
        },
        _.list(1, 5),
        callback,
      ),
    ).rejects.toThrowError(
      new DOMException('This operation was aborted', 'AbortError'),
    )
    expect(callback).not.toHaveBeenCalled()
  })

  test('remove abort listener after completion', async () => {
    vi.useFakeTimers()

    const ctrl = new AbortController()
    const removeEventListener = vi.spyOn(ctrl.signal, 'removeEventListener')

    const callback = vi.fn()
    await _.parallel(
      {
        limit: 2,
        signal: ctrl.signal,
      },
      _.list(1, 5),
      callback,
    )

    expect(callback).toHaveBeenCalledTimes(5)
    expect(removeEventListener).toHaveBeenCalledWith(
      'abort',
      expect.any(Function),
    )
  })
})
