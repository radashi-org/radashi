import { all } from 'radashi'

describe('all', () => {
  test('array input', async () => {
    const result = await all([] as Promise<number>[])
    expectTypeOf(result).toEqualTypeOf<number[]>()
  })

  test('object input', async () => {
    const result = await all({} as Record<string, Promise<number>>)
    expectTypeOf(result).toEqualTypeOf<Record<string, number>>()
  })

  test('readonly array input of promises, promise-like objects, and non-promises', async () => {
    const result = await all([
      Promise.resolve(1 as const),
      new Thenable(2 as const),
      3,
    ] as const)

    expectTypeOf(result).toEqualTypeOf<[1, 2, 3]>()
  })

  test('readonly array input with nested object', async () => {
    const result = await all([{ a: 1 }, Promise.resolve({ b: 2 })])

    expectTypeOf(result).toEqualTypeOf<[{ a: number }, { b: number }]>()
  })

  test('readonly object input of promises, promise-like objects, and non-promises', async () => {
    const result = await all({
      a: Promise.resolve(1 as const),
      b: new Thenable(2 as const),
      c: 3,
    } as const)

    expectTypeOf(result).toEqualTypeOf<{
      a: 1
      b: 2
      c: 3
    }>()
  })

  test('array input with nested promise', async () => {
    const result = await all([[Promise.resolve(1 as const)] as const])

    // Nested promises are not unwrapped.
    expectTypeOf(result).toEqualTypeOf<[readonly [Promise<1>]]>()
  })

  test('object input with nested promise', async () => {
    const result = await all({
      a: { b: Promise.resolve(1 as const) },
    })

    // Nested promises are not unwrapped.
    expectTypeOf(result).toEqualTypeOf<{ a: { b: Promise<1> } }>()
  })
})

class Thenable<T> implements PromiseLike<T> {
  constructor(private value: T) {}

  // biome-ignore lint/suspicious/noThenProperty:
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null,
  ): PromiseLike<TResult1 | TResult2> {
    return Promise.resolve(this.value).then(onfulfilled, onrejected)
  }
}
