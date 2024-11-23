import { describe, expect, it } from 'vitest'
import { dedent } from './dedent.ts'
import { normalizeIdentifiers } from './normalizeIdentifiers.ts'

describe('normalizeIdentifiers', () => {
  it('should normalize identifiers in a simple code snippet', () => {
    const input = dedent`
      function add(a, b) {
        return a + b;
      }
    `
    const result = normalizeIdentifiers(input)
    expect(result).toMatchInlineSnapshot(`
      "function id0(id1, id2) {
        return id1 + id2;
      }"
    `)
  })

  it('should handle multiple occurrences of the same identifier', () => {
    const input = dedent`
      const x = 5;
      let y = x + 3;
      console.log(x, y);
    `
    const result = normalizeIdentifiers(input)
    expect(result).toMatchInlineSnapshot(`
      "const id0 = 5;
      let id1 = id0 + 3;
      console.log(id0, id1);"
    `)
  })
})
