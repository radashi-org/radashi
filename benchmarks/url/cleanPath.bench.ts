import { cleanPath } from 'radashi'

describe('cleanPath', () => {
  bench('with no input', () => {
    cleanPath(undefined)
  })
  bench('with empty string', () => {
    cleanPath('')
  })
  bench('with correct path', () => {
    cleanPath('/some/path')
  })
  bench('with multiple slashes in path', () => {
    cleanPath('/some//path')
  })
  bench('with protocol, path, query, and fragment', () => {
    cleanPath('https://server//some//path?query=thing#fragment')
  })
})
