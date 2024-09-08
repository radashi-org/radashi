import * as _ from 'radashi'

function OldSchoolClass(something: string) {
  // @ts-ignore
  this.something = something
}
OldSchoolClass.prototype.doSomething = function () {
  return `do ${this.something}`
}

describe('isClass', () => {
  class Data {}
  test('returns false for non-Class values', () => {
    const fn = () => {}
    expect(_.isClass(OldSchoolClass)).toBeFalsy()
    expect(_.isClass(fn)).toBeFalsy()
    expect(_.isClass(undefined)).toBeFalsy()
    expect(_.isClass(null)).toBeFalsy()
    expect(_.isClass(false)).toBeFalsy()
    expect(_.isClass(() => {})).toBeFalsy()
    expect(_.isClass(async () => {})).toBeFalsy()
    expect(_.isClass(new Data())).toBeFalsy()
    expect(_.isClass(Number.NaN)).toBeFalsy()
    expect(_.isClass([1, 2, 3])).toBeFalsy()
    expect(_.isClass({})).toBeFalsy()
    expect(_.isClass('abc')).toBeFalsy()
    expect(_.isClass(String('abc'))).toBeFalsy()
  })
  test('returns true for class values', () => {
    expect(_.isClass(class CustomError extends Error {})).toBeTruthy()
    expect(_.isClass(class CustomClass {})).toBeTruthy()
  })
})
