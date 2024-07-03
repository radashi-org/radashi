import * as vm from 'node:vm'
import * as _ from 'radashi'

describe('isMap', () => {
  test('returns true for Map instances', () => {
    expect(_.isMap(new Map())).toBe(true)
  })
  test('returns true for Map subclass instances', () => {
    expect(_.isMap(new (class extends Map {})())).toBe(true)
  })
  test('returns true for Map instances from other realms', () => {
    expect(_.isMap(vm.runInNewContext('new Map()'))).toBe(true)
  })
  test('returns false for undefined', () => {
    expect(_.isMap(undefined)).toBe(false)
  })
  test('returns false for null', () => {
    expect(_.isMap(null)).toBe(false)
  })
  test('returns false for non-Map objects', () => {
    expect(_.isMap({})).toBe(false)
  })
})
