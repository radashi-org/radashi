import { withTrailingSlash } from 'radashi'

describe('withTrailingSlash', () => {
  bench('with no input', () => {
    withTrailingSlash(undefined)
  })
  bench('with empty string', () => {
    withTrailingSlash('')
  })
  bench('with missing trailing slash', () => {
    withTrailingSlash('some/path')
  })
  bench('with trailing slash', () => {
    withTrailingSlash('some/path/')
  })
})
