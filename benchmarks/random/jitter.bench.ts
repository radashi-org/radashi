import * as _ from 'radashi'

describe('jitter', () => {
  bench('3000ms with small factor (0.2)', () => {
    _.jitter(3000, 0.2)
  })

  bench('3000ms with large factor (0.8)', () => {
    _.jitter(3000, 0.8)
  })
})
