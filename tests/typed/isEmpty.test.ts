import * as _ from 'radashi';

function toArgs(array: any) {
    return function () {
        return arguments;
    }.apply(undefined, array);
}
const args = toArgs([1, 2, 3]);

describe('isEmpty', () => {
  class Data {}
  class Person {
    name = 'ray'
  }
  test('returns true for empty values', () => {
    expect(_.isEmpty(null)).toBeTruthy()
    expect(_.isEmpty(undefined)).toBeTruthy()
    expect(_.isEmpty(new Data())).toBeTruthy()
    expect(_.isEmpty(0)).toBeTruthy()
    expect(_.isEmpty(true)).toBeTruthy()
    expect(_.isEmpty([])).toBeTruthy()
    expect(_.isEmpty(false)).toBeTruthy()
    expect(_.isEmpty({})).toBeTruthy()
    expect(_.isEmpty('')).toBeTruthy()
    expect(_.isEmpty(String())).toBeTruthy()
    expect(_.isEmpty(new Map())).toBeTruthy()
    expect(_.isEmpty(new Date('invalid value'))).toBeTruthy()
  })
  test('returns false for non-empty values', () => {
    expect(_.isEmpty(new Date())).toBeFalsy()
    expect(_.isEmpty(new Date('2022-09-01T02:19:55.976Z'))).toBeFalsy()
    expect(_.isEmpty(22)).toBeFalsy()
    expect(_.isEmpty(new Person())).toBeFalsy()
    expect(_.isEmpty({ name: 'x' })).toBeFalsy()
    expect(_.isEmpty('abc')).toBeFalsy()
    expect(_.isEmpty(String('abc'))).toBeFalsy()
    expect(_.isEmpty([1, 2, 3])).toBeFalsy()
    expect(_.isEmpty(function work() {})).toBeFalsy()
    expect(_.isEmpty(() => {})).toBeFalsy()
    expect(_.isEmpty(Symbol(''))).toBeFalsy()
    expect(_.isEmpty(Symbol('hello'))).toBeFalsy()
    const map = new Map()
    map.set('a', 1)
    expect(_.isEmpty(map)).toBeFalsy()
  })

  it('should return `false` for non-empty values', () => {
        expect(_.isEmpty([0])).toBe(false);
        expect(_.isEmpty({ a: 0 })).toBe(false);
        expect(_.isEmpty('a')).toBe(false);
    });

   it('should work with jQuery/MooTools DOM query collections', () => {
        const arrayProto = Array.prototype;
        const push = arrayProto.push;
        function Foo(elements: unknown[]) {
            push.apply(this, elements);
        }
        Foo.prototype = { length: 0, splice: arrayProto.splice };
        // @ts-ignore
        expect(_.isEmpty(new Foo([]))).toBe(true);
    });

    it('should work with sets', () => {
      const set = new Set();
                expect(_.isEmpty(set)).toBe(true);
                set.add(1)
                expect(_.isEmpty(set)).toBe(false);
                set.clear();
    });

  it('should not treat objects with non-number lengths as array-like', () => {
        expect(_.isEmpty({ length: '0' })).toBe(false);
    });

  it('should work with `arguments` objects', () => {
        expect(_.isEmpty(args)).toBe(false);
    });

    it.skip('should work with an object that has a `length` property', () => {
        expect(_.isEmpty({ length: 0 })).toBe(false);
    });

   

    it.skip('should work with prototype objects', () => {
        function Foo() {}
        Foo.prototype = { constructor: Foo };

        expect(_.isEmpty(Foo.prototype)).toBe(true);

        Foo.prototype.a = 1;
        expect(_.isEmpty(Foo.prototype)).toBe(false);
    });

    it.skip('should not treat objects with negative lengths as array-like', () => {
        function Foo() {}
        Foo.prototype.length = -1;

        expect(_.isEmpty(new Foo())).toBe(true);
    });

    it.skip('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', () => {
        const MAX_SAFE_INTEGER = 9007199254740991;
        function Foo() {}
        Foo.prototype.length = MAX_SAFE_INTEGER + 1;

        expect(_.isEmpty(new Foo())).toBe(true);
    });

   

    it.skip('should return an unwrapped value when implicitly chaining', () => {
        expect(_({}).isEmpty()).toBe(true);
    });

    it.skip('should return a wrapped value when explicitly chaining', () => {
        expect(_({}).chain().isEmpty() instanceof _);
    });

})
