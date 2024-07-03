import * as vm from 'node:vm'
import * as _ from 'radashi'

describe('isSet', () => {
  test('returns true for Set instances', () => {
    expect(_.isSet(new Set())).toBe(true)
  })
  test('returns true for Set subclass instances', () => {
    expect(_.isSet(new (class extends Set {})())).toBe(true)
  })
  test('returns true for Set instances from other realms', () => {
    expect(_.isSet(vm.runInNewContext('new Set()'))).toBe(true)
  })
  test('returns false for undefined', () => {
    expect(_.isSet(undefined)).toBe(false)
  })
  test('returns false for null', () => {
    expect(_.isSet(null)).toBe(false)
  })
  test('returns false for non-Set objects', () => {
    expect(_.isSet({})).toBe(false)
  })
})
