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
  test('aborts the operation when the signal is triggered', async () => {
    const abortController = new AbortController()

    setTimeout(() => abortController.abort(), 150)

    const [error, results] = await _.try(async () => {
      return _.parallel(
        {
          limit: 1,
          signal: abortController.signal,
        },
        _.list(1, 12),
        async num => {
          await _.sleep(50)
          return `hi_${num}`
        },
      )
    })()

    expect(results).toBeUndefined()
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('This operation was aborted')
  })
  test('should throw if the abort controller aborted before first iteration has finished execution', async () => {
    const abortController = new AbortController()

    abortController.abort()

    const [error, results] = await _.try(async () => {
      return _.parallel(
        {
          limit: 1,
          signal: abortController.signal,
        },
        _.list(1, 24),
        async num => {
          await _.sleep(50)
          return `hi_${num}`
        },
      )
    })()

    expect(results).toBeUndefined()
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('This operation was aborted')
  })
  test('removes abort event listener after completion', async () => {
    const mockAbortSignal = {
      aborted: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      throwIfAborted: vi.fn(),
    }

    await _.parallel(
      {
        limit: 2,
        signal: mockAbortSignal,
      },
      _.list(1, 5),
      async num => {
        await new Promise(resolve => setTimeout(resolve, 10))
        return `hi_${num}`
      },
    )

    expect(mockAbortSignal.removeEventListener).toHaveBeenCalledWith(
      'abort',
      expect.any(Function),
    )
  })
})
