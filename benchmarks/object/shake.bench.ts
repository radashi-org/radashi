import * as _ from 'radashi'

describe('shake', () => {
  bench('with valid input', () => {
    _.shake({
      x: 2,
      y: null,
      z: undefined,
      o: false,
      r: 'x',
    })
  })

  bench('with filter function input', () => {
    _.shake(
      {
        x: 2,
        y: null,
        z: undefined,
        o: false,
        r: 'x',
      },
      val => val !== 'x',
    )
  })
})
