import * as _ from 'radashi'
import { bench } from 'vitest'

describe('diff', () => {
  bench('with entirely different arrays', () => {
    _.diff(['a', 'b', 'c'], ['c', 'd', 'e'])
  })

  bench('with identity function', () => {
    const identity = ({ letter }: { letter: string }) => letter
    const letter = (l: string) => ({ letter: l })
    _.diff(
      [letter('a'), letter('b'), letter('c')],
      [letter('c'), letter('d'), letter('e')],
      identity,
    )
  })
})
