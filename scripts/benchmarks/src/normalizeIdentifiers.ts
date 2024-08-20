import { parse } from '@babel/parser'
import babelTraverse from '@babel/traverse'

// Workaround: Some kind of ESM/CJS interop issue that TSX doesn't
// handle correctly for some unknown reason.
const traverse = (babelTraverse as any).default as typeof babelTraverse

/**
 * A somewhat naive approach to normalizing identifiers, since it
 * doesn't include scope analysis. But for what we use it for
 * (comparing two revisions of a function), it's good enough.
 *
 * Notes:
 * - We don't handle import declarations, since this only runs on
 *   bundled code.
 */
export function normalizeIdentifiers(code: string): string {
  const skippedIdentifiers = new Set<any>()
  const localIdentifiers = new Set<string>()
  const identifiers: {
    name: string
    start: number
    end: number
    isLocal: boolean
  }[] = []

  // Parse the code and collect local identifiers
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] })

  traverse(ast, {
    VariableDeclarator({ node }) {
      if (node.id.type === 'Identifier') {
        localIdentifiers.add(node.id.name)
      }
    },
    FunctionDeclaration({ node }) {
      if (node.id && node.id.type === 'Identifier') {
        localIdentifiers.add(node.id.name)
      }
      for (const param of node.params) {
        if (param.type === 'Identifier') {
          localIdentifiers.add(param.name)
        }
      }
    },
    FunctionExpression({ node }) {
      for (const param of node.params) {
        if (param.type === 'Identifier') {
          localIdentifiers.add(param.name)
        }
      }
    },
    ArrowFunctionExpression({ node }) {
      for (const param of node.params) {
        if (param.type === 'Identifier') {
          localIdentifiers.add(param.name)
        }
      }
    },
    CatchClause({ node }) {
      if (node.param && node.param.type === 'Identifier') {
        localIdentifiers.add(node.param.name)
      }
    },
    ForStatement({ node }) {
      if (node.init && node.init.type === 'VariableDeclaration') {
        for (const decl of node.init.declarations) {
          if (decl.id.type === 'Identifier') {
            localIdentifiers.add(decl.id.name)
          }
        }
      }
    },
    ForInStatement({ node }) {
      if (node.left.type === 'VariableDeclaration') {
        const decl = node.left.declarations[0]
        if (decl && decl.id.type === 'Identifier') {
          localIdentifiers.add(decl.id.name)
        }
      } else if (node.left.type === 'Identifier') {
        localIdentifiers.add(node.left.name)
      }
    },
    ForOfStatement({ node }) {
      if (node.left.type === 'VariableDeclaration') {
        const decl = node.left.declarations[0]
        if (decl && decl.id.type === 'Identifier') {
          localIdentifiers.add(decl.id.name)
        }
      } else if (node.left.type === 'Identifier') {
        localIdentifiers.add(node.left.name)
      }
    },
    ClassDeclaration({ node }) {
      if (node.id && node.id.type === 'Identifier') {
        localIdentifiers.add(node.id.name)
      }
    },
    MemberExpression({ node }) {
      if (node.property.type === 'Identifier') {
        skippedIdentifiers.add(node.property)
      }
    },
    Identifier({ node }) {
      if (skippedIdentifiers.has(node)) {
        return
      }
      identifiers.push({
        name: node.name,
        start: node.start!,
        end: node.end!,
        isLocal: localIdentifiers.has(node.name),
      })
    },
  })

  // Sort identifiers by their position in ascending order
  identifiers.sort((a, b) => a.start - b.start)

  // Create a mapping of original names to normalized names
  const nameMap = new Map<string, string>()
  let counter = 0

  let normalizedCode = ''
  let offset = 0

  for (const { name, start, end, isLocal } of identifiers) {
    if (isLocal) {
      if (!nameMap.has(name)) {
        nameMap.set(name, `id${counter++}`)
      }
      const normalizedName = nameMap.get(name)!
      normalizedCode += code.slice(offset, start) + normalizedName
      offset = end
    }
  }

  normalizedCode += code.slice(offset)
  return normalizedCode
}
