import { test, vi } from 'vitest'
import { run } from './pr-bundle-impact.cjs'

test('updates PR body with bundle impact', async () => {
  const pulls = {
    'radashi-org/radashi#1': {
      body: `
## Bundle impact

_Calculating..._
`,
    },
  }

  const env = {
    context: {
      repo: {
        owner: 'radashi-org',
        repo: 'radashi',
      },
      issue: { number: 1 },
    },
    github: {
      rest: {
        pulls: {
          get({ owner, repo, pull_number }) {
            return Promise.resolve({
              data: pulls[`${owner}/${repo}#${pull_number}`],
            })
          },
          update: vi.fn(),
        },
      },
    },
    core: {
      info: vi.fn(),
      setFailed: vi.fn(),
    },
  }

  await run(env, command => {
    expect(command).toEqual('pnpm -s bundle-impact')
    return `
| File | Size | Difference (%) |
| --- | --- | --- |
| src/foo/bar.ts | 110 | +10 (+10%) |
`
  })

  expect(env.github.rest.pulls.update).toHaveBeenCalled()
  expect(env.core.info).toHaveBeenCalled()
  expect(env.core.setFailed.mock.calls).toEqual([])

  expect(env.github.rest.pulls.update.mock.calls).toMatchInlineSnapshot(`
    [
      [
        {
          "body": "
    ## Bundle impact

    | File | Size | Difference (%) |
    | --- | --- | --- |
    | src/foo/bar.ts | 110 | +10 (+10%) |

    ",
          "owner": "radashi-org",
          "pull_number": 1,
          "repo": "radashi",
        },
      ],
    ]
  `)
  expect(env.core.info.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "running bundle-impact script...",
      ],
      [
        "fetching PR data...",
      ],
      [
        "updating PR description...",
      ],
      [
        "PR description updated with bundle impact.",
      ],
    ]
  `)
})
