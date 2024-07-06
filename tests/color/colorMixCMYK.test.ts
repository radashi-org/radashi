import * as _ from 'radashi'
import { Color } from 'radashi'

describe('colorMixCMYK', () => {
  test('mixes black and white', () => {
    expect(_.colorMixCMYK('#000000', '#FFFFFF', 0.5)).toEqual(
      new Color(0.5, 0.5, 0.5, 1),
    )
  })
  test('mixes blue and yellow', () => {
    expect(_.colorMixCMYK('#0000FF', '#FFFF00', 0.5)).toEqual(
      new Color(0.5, 0.5, 0.5, 1),
    )
  })
  test('mixes red and green with different ratios', () => {
    expect(_.colorMixCMYK('#FF0000', '#00FF00', 0.25)).toEqual(
      new Color(0.75, 0, 0.25, 1),
    )
    expect(_.colorMixCMYK('#FF0000', '#00FF00', 0.75)).toEqual(
      new Color(0.25, 0, 0.75, 1),
    )
  })
  test('handles alpha channel', () => {
    expect(_.colorMixCMYK('#FF0000', '#00FF0000', 0.5)).toEqual(
      new Color(0.5, 0, 0.5, 0.5),
    )
  })
  test('mixes CMYK colors', () => {
    expect(
      _.colorMixCMYK(
        { cyan: 0, magenta: 1, yellow: 0.75, key: 0.5, alpha: 1 },
        { cyan: 1, magenta: 0.5, yellow: 0.25, key: 0, alpha: 1 },
        0.5,
      ),
    ).toEqual(new Color(0.375, 0.375, 0.1875, 1))
  })
})
