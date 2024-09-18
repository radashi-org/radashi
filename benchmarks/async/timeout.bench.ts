import * as _ from 'radashi'

describe('timeout', () => {
  bench('with default error message', async () => {
    try {
      await _.timeout(0)
    } catch (_) {}
  })

  bench('with custom error message', async () => {
    try {
      await _.timeout(0, 'Optional message')
    } catch (_) {}
  })

  bench('with custom error function', async () => {
    try {
      await _.timeout(0, () => new Error('Custom error'))
    } catch (_) {}
  })
})
