import * as _ from 'radashi'
import { bench } from 'vitest'

describe('dedent', () => {
  const input = `
    Hello
    World
  `

  bench('dedent as tagged template literal', () => {
    const result = _.dedent`
      Hello
      World
      ${[1, 2, 3].join('\n')}
    `
  })

  bench('dedent as direct call', () => {
    const result = _.dedent(input)
  })
})
