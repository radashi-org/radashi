import * as _ from 'radashi'

const ms = 1
const sec = 1_000
const minute = 60 * sec
const hour = 60 * minute
const day = 24 * hour
const week = 7 * day

describe('DurationParser', () => {
  test('parse a duration string', () => {
    const parser = new _.DurationParser()

    expect(parser.parse('1 millisecond')).toBe(ms)
    expect(parser.parse('2 milliseconds')).toBe(2 * ms)

    expect(parser.parse('1 second')).toBe(sec)
    expect(parser.parse('2 seconds')).toBe(2 * sec)

    expect(parser.parse('1 minute')).toBe(minute)
    expect(parser.parse('2 minutes')).toBe(2 * minute)

    expect(parser.parse('1 hour')).toBe(hour)
    expect(parser.parse('2 hours')).toBe(2 * hour)

    expect(parser.parse('1 day')).toBe(day)
    expect(parser.parse('2 days')).toBe(2 * day)

    expect(parser.parse('1 week')).toBe(week)
    expect(parser.parse('2 weeks')).toBe(2 * week)
  })

  test('shorthand units', () => {
    const parser = new _.DurationParser()

    expect(parser.parse('1ms')).toBe(ms)
    expect(parser.parse('2ms')).toBe(2 * ms)

    expect(parser.parse('1s')).toBe(sec)
    expect(parser.parse('2s')).toBe(2 * sec)

    expect(parser.parse('1m')).toBe(minute)
    expect(parser.parse('2m')).toBe(2 * minute)

    expect(parser.parse('1h')).toBe(hour)
    expect(parser.parse('2h')).toBe(2 * hour)

    expect(parser.parse('1d')).toBe(day)
    expect(parser.parse('2d')).toBe(2 * day)

    expect(parser.parse('1w')).toBe(week)
    expect(parser.parse('2w')).toBe(2 * week)
  })

  test('custom units', () => {
    const parser = new _.DurationParser({
      units: {
        month: 30 * day,
      },
      short: {
        mo: 'month',
      },
    })

    expect(parser.parse('1 month')).toBe(30 * day)
    expect(parser.parse('2 months')).toBe(60 * day)

    expect(parser.parse('1mo')).toBe(30 * day)
    expect(parser.parse('2mo')).toBe(60 * day)
  })

  test('bad input', () => {
    const parser = new _.DurationParser()

    expect(() =>
      parser.parse('foo bar' as any),
    ).toThrowErrorMatchingInlineSnapshot(
      '[Error: Invalid quantity, cannot parse: foo bar]',
    )
    expect(() =>
      parser.parse('1 decade' as any),
    ).toThrowErrorMatchingInlineSnapshot(
      '[Error: Invalid unit: decade, makes sure it is one of: week, day, hour, minute, second, millisecond]',
    )
  })
})

test('parseDuration', () => {
  expect(_.parseDuration('3 hours')).toBe(3 * hour)
})
