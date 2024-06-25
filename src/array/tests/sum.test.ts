import * as _ from 'radashi'

const cast = <T = number[]>(value: any): T => value

describe('sum function', () => {
  test('adds list of number correctly', () => {
    const list = [5, 5, 10, 2]
    const result = _.sum(list)
    expect(result).toBe(22)
  })
  test('adds list of objects correctly using getter fn', () => {
    const list = [{ value: 5 }, { value: 5 }, { value: 10 }, { value: 2 }]
    const result = _.sum(list, x => x.value)
    expect(result).toBe(22)
  })
  test('gracefully handles null input list', () => {
    const result = _.sum(cast(null))
    expect(result).toBe(0)
  })
})
