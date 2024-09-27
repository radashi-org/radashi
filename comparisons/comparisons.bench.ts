import * as lodash from 'lodash'
import * as radashi from 'radashi'

const libs = {radashi, lodash} as const

type Library = typeof libs[keyof typeof libs]
type Benchmark = (_: Library) => void

function isLodash(_: Library): _ is typeof lodash {
  return _ === lodash
}

const benchmarks:  Partial<Record<keyof typeof radashi, Benchmark | Record<string, Benchmark>>> = {
  capitalize: _ => {
      _.capitalize('hello world')
  },
  unique: {
    "with non-empty array": _ => {
      const list = [1, 1, 2]
      if (isLodash(_)) {
        _.uniq(list)
      } else {
        _.unique(list)
      }
    },
    "with key fn": _ => {
      const list = [
        { id: 'a', word: 'hello' },
        { id: 'a', word: 'hello' },
        { id: 'b', word: 'oh' },
        { id: 'b', word: 'oh' },
        { id: 'c', word: 'yolo' },
      ]
      if (isLodash(_)) {
        _.uniqBy(list, x => x.id)
      } else {
        _.unique(list, x => x.id)
      }
    }
  },
  group: _ => {
    const list = [
      { group: 'a', word: 'hello' },
      { group: 'b', word: 'bye' },
      { group: 'a', word: 'oh' },
      { group: 'b', word: 'hey' },
      { group: 'c', word: 'ok' },
    ]
    if (isLodash(_)) {
      _.groupBy(list, x => x.group)
    } else {
      _.group(list, x => x.group)
    }
  },
  pick: {
    "with empty keys": _ => {
      const input = { a: 2 }

      if (isLodash(_)) {
        _.pickBy(input, [])
      } else {
        _.pick(input, [])
      }
    },
    "with key not in object": _ => {
      const input = { a: 2, b: 3 } as const

      if (isLodash(_)) {
        _.pickBy(input, ['c'])
      } else {
        _.pick(input, ['c'] as  unknown as ["b"])
      }
    },
    "with one key not in object": _ => {
      const input = { a: 2, b: 3 } as const

      if (isLodash(_)) {
        _.pickBy(input, ['a', 'c'])
      } else {
        _.pick(input, ['a', 'c'] as unknown as ["a"])
      }
    }
  },
  dash: _ => {
    const input = 'TestString123 with_MIXED_CASES, special!@#$%^&*()Characters, and numbers456'
    if (isLodash(_)) {
      _.kebabCase(input)
    } else {
      _.dash(input)
    }
  },
  max: {
    'with numbers': _ => {
      const list = [5, 5, 10, 2]
      _.max(list)
    },
    'with objects': _ => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 },
      ]
      _.max(list, x => x.score)
    }
  },
}

for (const [funcName, run] of Object.entries(benchmarks)) {
    if (!radashi.isFunction(run)) {
      const tests = Object.entries(run)
      for (const [testName, run] of tests) {
        describe(`${funcName}: ${testName}`, () => {
        for (const [libName, lib] of Object.entries(libs)) {

          bench(libName, () => run(lib))
        }
      })
      }
    } else {
      describe(funcName, () => {
      for (const [libName, lib] of Object.entries(libs)) {
        bench(libName, () => run(lib))
      }
      })
    }
}