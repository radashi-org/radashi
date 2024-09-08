import * as _ from 'radashi'

describe('parallel', () => {
  function makeProgressTracker() {
    let numInProgress = 0
    const tracking: number[] = []
    const func = async () => {
      numInProgress++
      tracking.push(numInProgress)
      await _.sleep(0)
      numInProgress--
    }

    return { tracking, func }
  }

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
    const { tracking, func } = makeProgressTracker()
    await _.parallel(3, _.list(1, 14), func)
    expect(Math.max(...tracking)).toBe(3)
  })

  test('should run only one parallel function when a negative number is passed', async () => {
    const { tracking, func } = makeProgressTracker()
    await _.parallel(-1, _.list(1, 10), func)
    expect(Math.max(...tracking)).toBe(1)
    expect(tracking).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
  })

  test('should run only one parallel function when 0 is passed', async () => {
    const { tracking, func } = makeProgressTracker()
    await _.parallel(0, _.list(1, 10), func)
    expect(Math.max(...tracking)).toBe(1)
    expect(tracking).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
  })

  test('should run the same number of parallel functions as the array size when Infinity is passed', async () => {
    const { tracking, func } = makeProgressTracker()
    await _.parallel(Number.POSITIVE_INFINITY, _.list(1, 10), func)
    expect(Math.max(...tracking)).toBe(10)
    expect(tracking).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
})
