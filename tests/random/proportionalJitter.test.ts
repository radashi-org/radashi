import * as _ from 'radashi'

describe('proportionalJitter', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns the base value when randomness is centered', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    expect(_.proportionalJitter(80, 0.25)).toBe(80)
  })

  test('produces the minimum value when randomness is at the upper bound', () => {
    vi.spyOn(Math, 'random').mockReturnValue(1)

    expect(_.proportionalJitter(100, 0.1)).toBe(90)
  })

  test('produces the maximum value when randomness is at the lower bound', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    expect(_.proportionalJitter(120, 0.2)).toBe(144)
  })
})
