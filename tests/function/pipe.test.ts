import { pipe } from 'radashi'

describe('pipe', () => {
  test('returns the input value when no functions are provided', () => {
    const result = pipe(7)

    expect(result).toBe(7)
  })

  test('applies a single function', () => {
    const result = pipe(2, x => x * 3)

    expect(result).toBe(6)
  })

  test('applies multiple functions in sequence', () => {
    const result = pipe(
      2,
      x => x * 3,
      x => x + 4,
    )

    expect(result).toBe(10)
  })

  test('transforms string to uppercase and reverses it', () => {
    const result = pipe(
      'hello',
      x => x.toUpperCase(),
      x => x.split('').reverse().join(''),
    )

    expect(result).toBe('OLLEH')
  })

  test('handles transformation from number to string', () => {
    const result = pipe(
      5,
      x => x * 2, // 10
      x => x.toString(), // "10"
      x => x + '!', // "10!"
    )
    expect(result).toBe('10!')
  })

  test('processes an array correctly', () => {
    const result = pipe(
      [1, 2, 3],
      arr => arr.map(x => x * 2), // [2, 4, 6]
      arr => arr.filter(x => x >= 4), // [4, 6]
      arr => arr.join('-'), // "4-6"
    )
    expect(result).toBe('4-6')
  })

  test('transforms an object correctly', () => {
    const result = pipe(
      { name: 'Alice', age: 25 },
      obj => ({ ...obj, age: obj.age + 1 }), // { name: "Alice", age: 26 }
      obj => JSON.stringify(obj), // '{"name":"Alice","age":26}'
    )
    expect(result).toBe('{"name":"Alice","age":26}')
  })
})
