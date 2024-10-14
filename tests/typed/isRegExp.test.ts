import * as vm from 'node:vm'
import * as _ from 'radashi'

describe('isRegExp', () => {
  test('returns true for RegExp instances', () => {
    expect(_.isRegExp(/.+/)).toBe(true)
  })
  test('returns true for RegExp subclass instances', () => {
    expect(_.isRegExp(new (class extends RegExp {})('.+'))).toBe(true)
  })
  test('returns true for RegExp instances from other realms', () => {
    expect(_.isRegExp(vm.runInNewContext('/.+/'))).toBe(true)
  })
  test('returns false for undefined', () => {
    expect(_.isRegExp(undefined)).toBe(false)
  })
  test('returns false for null', () => {
    expect(_.isRegExp(null)).toBe(false)
  })
  test('returns false for non-Set objects', () => {
    expect(_.isRegExp({})).toBe(false)
  })
})
