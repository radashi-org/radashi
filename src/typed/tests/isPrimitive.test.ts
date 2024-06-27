import * as _ from 'radashi'

describe('isPrimitive function', () => {
  test('returns true for all the primitives', () => {
    const arr = [
      1.1,
      'How you doin?',
      false,
      Symbol('key'),
      BigInt('1'),
      undefined,
      null
    ]

    for (const elm of arr) {
      expect(_.isPrimitive(elm)).toBeTruthy()
    }
  })
  test('returns false for non-primitives', () => {
    const arr = [new Date(), Number, {}, Object({}), () => 0, [1, 2]]

    for (const elm of arr) {
      expect(_.isPrimitive(elm)).toBeFalsy()
    }
  })
})
