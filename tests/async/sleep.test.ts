import * as _ from 'radashi'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('suspends a thread for a specified number of milliseconds', async () => {
    const ONE_SECOND = 1000
    const before = Date.now()
    const promise = _.sleep(ONE_SECOND)
    vi.advanceTimersToNextTimerAsync()
    await promise
    const after = Date.now()
    expect(after).toBeGreaterThanOrEqual(before + ONE_SECOND)
  })
})
