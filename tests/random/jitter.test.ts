import * as _ from 'radashi'

describe('jitter', () => {
  it('returns the base delay when factor is 0', () => {
    const delay = 1000
    for (let i = 0; i < 5; i++) {
      const result = _.jitter(delay, 0)
      assert.strictEqual(result, delay)
    }
  })

  it('returns a value within the expected jitter range', () => {
    const delay = 1000
    const factor = 0.3
    // Expected range: [700, 1300]
    for (let i = 0; i < 20; i++) {
      const result = _.jitter(delay, factor)
      assert.ok(result >= 700 && result <= 1300, `Got ${result}`)
    }
  })

  it('never returns a negative value', () => {
    for (let i = 0; i < 10; i++) {
      const result = _.jitter(0, 1)
      assert.ok(result >= 0)
    }
  })

  it('uses default factor 0.2 when not provided', () => {
    const delay = 1000
    // Expected range: [800, 1200]
    for (let i = 0; i < 10; i++) {
      const result = _.jitter(delay)
      assert.ok(result >= 800 && result <= 1200, `Got ${result}`)
    }
  })

  it('returns 0 for negative delay', () => {
    const result = _.jitter(-100, 0.5)
    assert.strictEqual(result, 0)
  })

  it('returns 0 for NaN delay', () => {
    const result = _.jitter(Number.NaN, 0.5)
    assert.strictEqual(result, 0)
  })

  it('returns 0 for Infinity delay', () => {
    const result = _.jitter(Number.POSITIVE_INFINITY, 0.5)
    assert.strictEqual(result, 0)
  })

  it('treats negative factor as 0', () => {
    const delay = 1000
    const result = _.jitter(delay, -0.5)
    assert.strictEqual(result, delay)
  })

  it('treats NaN factor as 0', () => {
    const delay = 1000
    const result = _.jitter(delay, Number.NaN)
    assert.strictEqual(result, delay)
  })

  it('treats Infinity factor as 0', () => {
    const delay = 1000
    const result = _.jitter(delay, Number.POSITIVE_INFINITY)
    assert.ok(result >= 0)
  })
})
