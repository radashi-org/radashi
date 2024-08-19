import * as _ from 'radashi'

describe('similarity', () => {
  // https://github.com/fabiospampinato/tiny-levenshtein/blob/master/test/index.js
  test('returns the distance between two strings', () => {
    /* cSpell:disable */
    expect(_.similarity('abc', 'abc')).toBe(0)
    expect(_.similarity('a', 'b')).toBe(1)
    expect(_.similarity('ab', 'ac')).toBe(1)
    expect(_.similarity('ac', 'bc')).toBe(1)
    expect(_.similarity('abc', 'axc')).toBe(1)
    expect(_.similarity('kitten', 'sitting')).toBe(3)
    expect(_.similarity('xabxcdxxefxgx', '1ab2cd34ef5g6')).toBe(6)
    expect(_.similarity('cat', 'cow')).toBe(2)
    expect(_.similarity('xabxcdxxefxgx', 'abcdefg')).toBe(6)
    expect(_.similarity('javawasneat', 'scalaisgreat')).toBe(7)
    expect(_.similarity('example', 'samples')).toBe(3)
    expect(_.similarity('sturgeon', 'urgently')).toBe(6)
    expect(_.similarity('levenshtein', 'frankenstein')).toBe(6)
    expect(_.similarity('distance', 'difference')).toBe(5)
    expect(
      _.similarity(
        '因為我是中國人所以我會說中文',
        '因為我是英國人所以我會說英文',
      ),
    ).toBe(2)
    /* cSpell:enable */
  })
  test('containment', () => {
    /* cSpell:disable */
    expect(_.similarity('abababab', 'ab')).toBe(6)
    expect(_.similarity('ab', 'abababab')).toBe(6)
    expect(_.similarity('abc', 'ab')).toBe(1)
    expect(_.similarity('ab', 'abc')).toBe(1)
    /* cSpell:enable */
  })
})
