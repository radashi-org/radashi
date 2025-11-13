import * as _ from 'radashi'

const lettersLeft = new Set(['a', 'b', 'c', 'd'])
const lettersRight = new Set(['a', 'b', 'c', 'd'])

const objOne = { id: 1 }
const objTwo = { id: 2 }
const objectsLeft = new Set([objOne, objTwo])
const objectsRight = new Set([objOne, objTwo])
const objectsDifferent = new Set([objOne, { id: 2 }])

const missingLetters = new Set(['a', 'b', 'c'])

describe('isSetEqual', () => {
  bench('with identical sets', () => {
    expect(_.isSetEqual(lettersLeft, lettersRight)).toBeTruthy()
  })

  bench('with shared object references', () => {
    expect(_.isSetEqual(objectsLeft, objectsRight)).toBeTruthy()
  })

  bench('with different references', () => {
    expect(_.isSetEqual(objectsLeft, objectsDifferent)).toBeFalsy()
  })

  bench('with missing entries', () => {
    expect(_.isSetEqual(lettersLeft, missingLetters)).toBeFalsy()
  })
})
