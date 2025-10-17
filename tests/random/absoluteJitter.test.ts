import * as _ from 'radashi'

describe('absoluteJitter', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns the base value when randomness is centered', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    expect(_.absoluteJitter(25, 4)).toBe(25)
  })

  test('produces the maximum value when randomness is at the upper bound', () => {
    vi.spyOn(Math, 'random').mockReturnValue(1)

    expect(_.absoluteJitter(10, 3)).toBe(13)
  })

  test('produces the minimum value when randomness is at the lower bound', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    expect(_.absoluteJitter(10, 3)).toBe(7)
  })
})
