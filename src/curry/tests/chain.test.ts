import * as _ from 'radashi'

describe('chain function', () => {
  test('calls all given functions', () => {
    const genesis = (num: number, name: string) => 0
    const addFive = (num: number) => num + 5
    const twoX = (num: number) => num * 2
    const func = _.chain(genesis, addFive, twoX)
    const result = func(0, '')
    expect(result).toBe(10)
  })

  test('calls add(1), then addFive, then twoX functions by 1', () => {
    const add = (y: number) => (x: number) => x + y
    const addFive = add(5)
    const twoX = (num: number) => num * 2
    const func = _.chain(add(1), addFive, twoX)
    const result = func(1)
    expect(result).toBe(14)
  })

  test('calls add(2), then addFive, then twoX, then repeatX functions by 1', () => {
    const add = (y: number) => (x: number) => x + y
    const addFive = add(5)
    const twoX = (num: number) => num * 2
    const repeatX = (num: number) => 'X'.repeat(num)
    const func = _.chain(add(2), addFive, twoX, repeatX)
    const result = func(1)
    expect(result).toBe('XXXXXXXXXXXXXXXX')
  })

  test('calls addFive, then add(2), then twoX, then repeatX functions by 1', () => {
    const add = (y: number) => (x: number) => x + y
    const addFive = add(5)
    const twoX = (num: number) => num * 2
    const repeatX = (num: number) => 'X'.repeat(num)
    const func = _.chain(addFive, add(2), twoX, repeatX)
    const result = func(1)
    expect(result).toBe('XXXXXXXXXXXXXXXX')
  })

  test('calls getName, then upperCase functions as a mapper for User[]', () => {
    type User = { id: number; name: string }
    const users: User[] = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'John Smith' },
      { id: 3, name: 'John Wick' }
    ]
    const getName = <T extends { name: string }>(item: T) => item.name
    const upperCase: (x: string) => Uppercase<string> = (text: string) =>
      text.toUpperCase() as Uppercase<string>

    const getUpperName = _.chain(getName, upperCase)
    const result = users.map(getUpperName)
    expect(result).toEqual(['JOHN DOE', 'JOHN SMITH', 'JOHN WICK'])
  })
})
