import * as _ from 'radashi'
import { Color } from 'radashi'

describe('parseColor', () => {
  test('parse HEX color strings', () => {
    expect(_.parseColor('#FFF')).toEqual(new Color(1, 1, 1, 1))
    expect(_.parseColor('#FFF0')).toEqual(new Color(1, 1, 1, 0))
    expect(_.parseColor('#ffffff')).toEqual(new Color(1, 1, 1, 1))
    expect(_.parseColor('#ffffff00')).toEqual(new Color(1, 1, 1, 0))
    expect(_.parseColor('#000')).toEqual(new Color(0, 0, 0, 1))
    expect(_.parseColor('#00000080')).toEqual(new Color(0, 0, 0, 0x80 / 255))
  })
  test('parse RGB color strings', () => {
    expect(_.parseColor('rgb(0,0,0)')).toEqual(new Color(0, 0, 0, 1))
    expect(_.parseColor('rgb(255,255,255)')).toEqual(new Color(1, 1, 1, 1))

    const f128 = 128 / 255
    expect(_.parseColor('rgb(128, 128, 128)')).toEqual(
      new Color(f128, f128, f128, 1),
    )
  })
  test('parse RGBA color strings', () => {
    expect(_.parseColor('rgba(255,255,255,0.5)')).toEqual(
      new Color(1, 1, 1, 0.5),
    )
    expect(_.parseColor('rgba(0, 0, 0, 0)')).toEqual(new Color(0, 0, 0, 0))

    const f128 = 128 / 255
    expect(_.parseColor('rgba(128, 128, 128, 0.75)')).toEqual(
      new Color(f128, f128, f128, 0.75),
    )
  })
  test('stringify the Color object', () => {
    const white = _.parseColor('#fff')
    expect(`${white}`).toBe('rgba(255, 255, 255, 1)')
  })
  test('HSL strings are not supported', () => {
    expect(() => _.parseColor('hsl(0, 100%, 100%)')).toThrow(
      'Invalid color string: hsl(0, 100%, 100%)',
    )
  })
  test('out-of-bounds RGB values are not clamped', () => {
    const f256 = 256 / 255
    expect(_.parseColor('rgb(256, 256, 256)')).toEqual(
      new Color(f256, f256, f256, 1),
    )
  })
  test('return the default value for invalid color strings', () => {
    expect(_.parseColor('not a color', 'default')).toBe('default')
    expect(_.parseColor('#ff', null)).toBe(null)
  })
  test('throw an error for invalid color strings', () => {
    expect(() => _.parseColor('not a color')).toThrow(
      'Invalid color string: not a color',
    )
    expect(() => _.parseColor('#ggg')).toThrow('Invalid color string: #ggg')
    expect(() => _.parseColor('#ff')).toThrow('Invalid color string: #ff')
  })
})
