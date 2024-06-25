import * as _ from 'radashi'

describe('_.sleep function', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  test('suspends a thread for a specified number of milliseconds', async () => {
    const ONE_SECOND = 1000
    const before = Date.now()
    await _.sleep(ONE_SECOND)
    const after = Date.now()
    expect(after).toBeGreaterThanOrEqual(before + ONE_SECOND)
  })
})
