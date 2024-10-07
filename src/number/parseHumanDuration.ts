export type HumanDuration<
  Unit extends string,
  ShortUnit extends string = never,
> = `1 ${Unit}` | `${number} ${Unit}s` | `${number}${ShortUnit}`

export type HumanDurationOptions<
  Unit extends string = string,
  ShortUnit extends string = string,
> = {
  /**
   * Time units mapping
   */
  units: Record<Unit, number>
  /**
   * Aliases for time units
   */
  short?: Record<ShortUnit, Unit>
}

export function defineHumanDurationParser<
  Unit extends string,
  ShortUnit extends string = never,
>({ units, short }: HumanDurationOptions<Unit, ShortUnit>) {
  // Return a function that takes human-readable duration and converts to milliseconds
  return (humanDuration: HumanDuration<Unit, ShortUnit>): number => {
    const match = humanDuration.match(/^(\d+(?:\.\d+)?) ?(\w+)?s?$/)
    if (!match) {
      throw new Error('Invalid duration')
    }

    let unit = match[2] as Unit | ShortUnit
    unit = short && unit in short ? short[unit as ShortUnit] : (unit as Unit)

    return Number.parseFloat(match[1]) * units[unit]
  }
}

export const parseHumanDuration: (
  humanDuration: HumanDuration<
    'week' | 'day' | 'hour' | 'minute' | 'second',
    never
  >,
) => number = defineHumanDurationParser({
  units: {
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  },
})
