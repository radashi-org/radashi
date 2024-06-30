import * as _ from 'radashi'

describe('compose function', () => {
  test('composes functions', () => {
    const useZero = (fn: (num: number) => number) => () => fn(0)
    const objectize = (fn: (obj: { num: number }) => number) => (num: number) =>
      fn({ num })
    const increment =
      (fn: (arg: { num: number }) => number) =>
      ({ num }: { num: number }) =>
        fn({ num: num + 1 })
    const returnArg = (arg: 'num') => (args: { num: number }) => args[arg]

    const composed = _.compose(
      useZero,
      objectize,
      increment,
      increment,
      returnArg('num'),
    )

    const decomposed = useZero(
      objectize(increment(increment(returnArg('num')))),
    )

    const expected = decomposed()
    const result = composed()

    expect(result).toBe(expected)
    expect(result).toBe(2)
  })
  test('composes async function', async () => {
    const useZero = (fn: (num: number) => Promise<number>) => async () => fn(0)
    const objectize =
      (fn: (obj: { num: number }) => Promise<number>) => async (num: number) =>
        fn({ num })
    const increment =
      (fn: (arg: { num: number }) => Promise<number>) =>
      async ({ num }: { num: number }) =>
        fn({ num: num + 1 })
    const returnArg = (arg: 'num') => async (args: { num: number }) => args[arg]

    const composed = _.compose(
      useZero,
      objectize,
      increment,
      increment,
      returnArg('num'),
    )

    const decomposed = useZero(
      objectize(increment(increment(returnArg('num')))),
    )

    const expected = await decomposed()
    const result = await composed()

    expect(result).toBe(expected)
  })
  test('composes function type overloads', () => {
    const useZero = (fn: (num: number) => number) => () => fn(0)
    const objectize = (fn: (obj: { num: number }) => number) => (num: number) =>
      fn({ num })
    const increment =
      (fn: (arg: { num: number }) => number) =>
      ({ num }: { num: number }) =>
        fn({ num: num + 1 })
    const returnArg = (arg: 'num') => (args: { num: number }) => args[arg]
    const returnNum = () => (num: number) => num

    expect(_.compose(useZero, returnNum())()).toBe(0)

    expect(_.compose(useZero, objectize, returnArg('num'))()).toBe(0)

    expect(_.compose(useZero, objectize, increment, returnArg('num'))()).toBe(1)

    expect(
      _.compose(useZero, objectize, increment, increment, returnArg('num'))(),
    ).toBe(2)

    expect(
      _.compose(
        useZero,
        objectize,
        increment,
        increment,
        increment,
        returnArg('num'),
      )(),
    ).toBe(3)

    expect(
      _.compose(
        useZero,
        objectize,
        increment,
        increment,
        increment,
        increment,
        returnArg('num'),
      )(),
    ).toBe(4)

    expect(
      _.compose(
        useZero,
        objectize,
        increment,
        increment,
        increment,
        increment,
        increment,
        returnArg('num'),
      )(),
    ).toBe(5)

    expect(
      _.compose(
        useZero,
        objectize,
        increment,
        increment,
        increment,
        increment,
        increment,
        increment,
        returnArg('num'),
      )(),
    ).toBe(6)

    expect(
      _.compose(
        useZero,
        objectize,
        increment,
        increment,
        increment,
        increment,
        increment,
        increment,
        increment,
        returnArg('num'),
      )(),
    ).toBe(7)
  })
})
