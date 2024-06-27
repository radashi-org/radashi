import * as _ from 'radashi'

describe('uid function', () => {
  test('generates the correct length string', () => {
    const result = _.uid(10)
    expect(result.length).toBe(10)
  })
  /**
   * @warning This is potentially a flaky test.
   * We're trying to assert that given additional
   * special chars our function will include them
   * in the random selection process to generate the
   * uid. However, there is always a small chance that
   * one is never selected. If the test is flaky, increase
   * the size of the uid and/or the number of underscores
   * in the special char addition.
   */
  test('uid generates string including special', () => {
    const result = _.uid(
      300,
      '________________________________________________________________',
    )
    expect(result).toContain('_')
  })
})
