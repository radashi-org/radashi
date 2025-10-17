import * as _ from 'radashi'

const basicLeft = new Map<string, any>([
  ['id', 1],
  ['name', 'radashi'],
  ['active', true],
])
const basicRight = new Map<string, any>([
  ['id', 1],
  ['name', 'radashi'],
  ['active', true],
])

const nestedLeft = new Map([
  ['user', { id: 7, tags: ['bench', 'map'] }],
  ['meta', { createdAt: new Date(0), roles: ['admin'] }],
])
const nestedRight = new Map([
  ['user', { id: 7, tags: ['bench', 'map'] }],
  ['meta', { createdAt: new Date(0), roles: ['admin'] }],
])

const mismatched = new Map<string, any>([
  ['id', 1],
  ['name', 'radashi'],
  ['active', false],
])

const extraEntry = new Map<string, any>([
  ['id', 1],
  ['name', 'radashi'],
  ['active', true],
  ['role', 'admin'],
])

describe('isMapEqual', () => {
  bench('with identical maps', () => {
    expect(_.isMapEqual(basicLeft, basicRight)).toBeTruthy()
  })

  bench('with nested values', () => {
    expect(_.isMapEqual(nestedLeft, nestedRight)).toBeTruthy()
  })

  bench('with mismatched values', () => {
    expect(_.isMapEqual(basicLeft, mismatched)).toBeFalsy()
  })

  bench('with different sizes', () => {
    expect(_.isMapEqual(basicLeft, extraEntry)).toBeFalsy()
  })
})
