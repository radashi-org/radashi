import { withLeadingSlash } from 'radashi'

describe('withLeadingSlash', () => {
  bench('with no input', () => {
    withLeadingSlash(undefined)
  })
  bench('with empty string', () => {
    withLeadingSlash('')
  })
  bench('with missing leading slash', () => {
    withLeadingSlash('some/path')
  })
  bench('with leading slash', () => {
    withLeadingSlash('/some/path')
  })
})
