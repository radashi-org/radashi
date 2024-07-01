import * as _ from 'radashi'
import { AggregateError } from 'radashi'

describe('parallel', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  test('returns all results from all functions', async () => {
    const [errors, results] = await _.try(async () => {
      return _.parallel(1, _.list(1, 3), async num => {
        await _.sleep(1000)
        return `hi_${num}`
      })
    })()
    expect(errors).toBeUndefined()
    expect(results).toEqual(['hi_1', 'hi_2', 'hi_3'])
  })
  test('throws errors as array of all errors', async () => {
    const [error, results] = await _.try(async () => {
      return _.parallel(1, _.list(1, 3), async num => {
        await _.sleep(1000)
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
      await _.sleep(300)
      numInProgress--
    })
    expect(Math.max(...tracking)).toBe(3)
  })
})
