import { parse } from '@babel/parser'
import babelTraverse, { type NodePath, type Scope } from '@babel/traverse'
import type { Expression, LVal, VariableDeclaration } from '@babel/types'

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

  const recurse = (
    node: VariableDeclaration | Expression | LVal,
    scope: Scope,
    parentPath: NodePath,
  ) => {
    if (node.type === 'Identifier') {
      localIdentifiers.add(node.name)
    } else {
      traverse(
        node,
        {
          Identifier({ node }) {
            localIdentifiers.add(node.name)
          },
        },
        scope,
        undefined,
        parentPath,
      )
    }
  }

  traverse(ast, {
    VariableDeclarator({ node, scope, parentPath }) {
      recurse(node.id, scope, parentPath)
    },
    FunctionDeclaration({ node, scope, parentPath }) {
      if (node.id) {
        localIdentifiers.add(node.id.name)
      }
      for (const param of node.params) {
        recurse(param, scope, parentPath)
      }
    },
    FunctionExpression({ node, scope, parentPath }) {
      for (const param of node.params) {
        recurse(param, scope, parentPath)
      }
    },
    ArrowFunctionExpression({ node, scope, parentPath }) {
      for (const param of node.params) {
        recurse(param, scope, parentPath)
      }
    },
    CatchClause({ node, scope, parentPath }) {
      if (node.param) {
        recurse(node.param, scope, parentPath)
      }
    },
    ForStatement({ node, scope, parentPath }) {
      if (node.init && node.init.type === 'VariableDeclaration') {
        for (const decl of node.init.declarations) {
          recurse(decl.id, scope, parentPath)
        }
      }
    },
    ForInStatement({ node, scope, parentPath }) {
      recurse(node.left, scope, parentPath)
    },
    ForOfStatement({ node, scope, parentPath }) {
      recurse(node.left, scope, parentPath)
    },
    ClassDeclaration({ node }) {
      if (node.id) {
        localIdentifiers.add(node.id.name)
      }
    },
    MemberExpression({ node }) {
      if (node.property.type === 'Identifier') {
        skippedIdentifiers.add(node.property)
      }
    },
  })

  traverse(ast, {
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
