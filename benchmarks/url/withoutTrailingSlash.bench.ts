import { withoutTrailingSlash } from 'radashi'

describe('withoutTrailingSlash', () => {
  bench('with no input', () => {
    withoutTrailingSlash(undefined)
  })
  bench('with empty string', () => {
    withoutTrailingSlash('')
  })
  bench('with trailing slash', () => {
    withoutTrailingSlash('some/path/')
  })
  bench('without trailing slash', () => {
    withoutTrailingSlash('some/path')
  })
})
