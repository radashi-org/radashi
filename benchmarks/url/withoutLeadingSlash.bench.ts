import { withoutLeadingSlash } from 'radashi'

describe('withoutLeadingSlash', () => {
  bench('with no input', () => {
    withoutLeadingSlash(undefined)
  })
  bench('with empty string', () => {
    withoutLeadingSlash('')
  })
  bench('with leading slash', () => {
    withoutLeadingSlash('/some/path')
  })
  bench('without leading slash', () => {
    withoutLeadingSlash('some/path')
  })
})
