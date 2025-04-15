import * as _ from 'radashi'

describe('not', () => {
  test('inverts boolean return value of a function', () => {
    const isEven = (n: number): boolean => n % 2 === 0
    const isOdd = _.not(isEven)

    expect(isOdd(1)).true
    expect(isOdd(2)).false
    expect(isOdd(3)).true
    expect(isOdd(4)).false
  })

  test('works with functions that return truthy/falsy values', () => {
    const hasElements = (arr: any[]): boolean => arr.length > 0
    const isEmpty = _.not(hasElements)

    expect(isEmpty([])).true
    expect(isEmpty([1, 2, 3])).false
    expect(isEmpty([0])).false
  })

  test('preserves function context', () => {
    class NumMock {
      public constructor(private _value: number) {}
      public get value(): number {
        return this._value
      }
      public set value(val: number) {
        this._value = val
      }
      isLessThan50(): boolean {
        return this._value < 50
      }
    }

    const numMockInstance = new NumMock(42)
    const isLessThan50WithContext =
      numMockInstance.isLessThan50.bind(numMockInstance)

    const isAtLeast50 = _.not(isLessThan50WithContext)
    expect(isAtLeast50()).false

    numMockInstance.value = 60
    expect(isAtLeast50()).true
  })

  test('passes all arguments to the original function', () => {
    const SYSTEM_MATRIX = 'Matrix'
    const USER_NEO = 'Neo'
    const USER_MORPHEUS = 'Morpheus'
    const USER_SMITH = 'Smith'

    const isSuperUser = vi.fn((username: string, systemId: string) => {
      return username === 'Neo' && systemId === 'Matrix'
    })

    const isNotSuperUser = _.not(isSuperUser)

    expect(isSuperUser(USER_NEO, SYSTEM_MATRIX)).true

    expect(isNotSuperUser(USER_SMITH, SYSTEM_MATRIX)).true
    expect(isSuperUser).toHaveBeenCalledWith(USER_SMITH, SYSTEM_MATRIX)
    expect(isNotSuperUser(USER_MORPHEUS, SYSTEM_MATRIX)).true
    expect(isSuperUser).toHaveBeenCalledWith(USER_MORPHEUS, SYSTEM_MATRIX)
  })
})
