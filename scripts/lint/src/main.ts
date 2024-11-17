import { execa, type Subprocess } from 'execa'
import kleur from 'kleur'
import mri from 'mri'
import { existsSync, rmSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { Transform } from 'node:stream'
import parseArgsStringToArgv from 'string-argv'
import { globSync } from 'tinyglobby'

const lint = (scripts: string[]): Command[] => [
  {
    name: 'biome',
    color: 'cyan',
    command: 'biome check ./src ./tests ./benchmarks',
  },
  {
    name: 'spell-check',
    color: 'gray',
    command: 'cspell . --quiet',
  },
  {
    name: 'jsr',
    color: 'green',
    command: 'dlx jsr publish --dry-run --allow-dirty',
  },
  {
    name: 'tsc',
    color: 'blue',
    command: [
      {
        name: 'src',
        color: 'cyan',
        command: 'tsc',
      },
      {
        name: 'tests',
        color: 'green',
        command: 'tsc -p tests',
      },
      {
        name: 'benchmarks',
        color: 'magenta',
        command: 'tsc -p benchmarks',
      },
      // Scripts need special handling, because their dependencies are
      // not guaranteed to be installed. We also run "tsc" once per
      // package.json so that we can lint specific scripts when
      // command filters are provided.
      ...scripts.map((dir): Command => {
        return {
          name: dir,
          color: 'yellow',
          command: `tsc -p ${dir}`,
          async pre(prefix) {
            // Ensure script dependencies are installed.
            if (!existsSync(path.join(dir, 'node_modules'))) {
              const installProc = execa(
                'node',
                ['scripts/run.js', path.basename(dir)],
                {
                  stdout: 'pipe',
                  stderr: 'inherit',
                  env: {
                    INSTALL_ONLY: 'true',
                  },
                },
              )

              installProc.stdout
                .pipe(createPrefixStream(prefix + ' '))
                .pipe(process.stdout)

              await installProc
            }

            // Create a temporary tsconfig.json file that points to
            // the shared tsconfig.json file, so we can lint
            // specific scripts when command filters are provided.
            const tsconfig = {
              extends: '../tsconfig.json',
            }

            await fs.writeFile(
              path.join(dir, 'tsconfig.json'),
              JSON.stringify(tsconfig, null, 2),
            )
          },
          post() {
            rmSync(path.join(dir, 'tsconfig.json'))
          },
        }
      }),
    ],
  },
]

main()

async function main() {
  const argv = mri(process.argv.slice(2), {
    boolean: ['ignore-scripts'],
    string: ['base'],
  })

  const commandFilters = argv._
  const ignoreScripts = !!argv['ignore-scripts']
  const baseCommit = argv.base as string | undefined

  // If a base commit is provided, it's used to determine which
  // scripts need to be linted (if any).
  const files = baseCommit ? await getChangedFiles(baseCommit) : undefined

  let scripts = mightLintScripts(files, ignoreScripts, commandFilters)
    ? globSync('scripts/*/src/main.ts').map(p => path.dirname(path.dirname(p)))
    : []

  if (files) {
    scripts = scripts.filter(dir => {
      dir = path.join(dir, '/')
      return files.some(file => file.startsWith(dir))
    })
  }

  const commands = lint(scripts)
  await runConcurrently(commands, name => matchFilter(name, commandFilters))
}

/**
 * In a CI environment, we always lint scripts unless the user
 * explicitly asked us to ignore them. Otherwise, we only lint
 * scripts if a matching command filter is provided.
 */
function mightLintScripts(
  files: string[] | undefined,
  ignoreScripts: boolean,
  commandFilters: string[],
): boolean {
  if (ignoreScripts) {
    return false
  }
  if (files) {
    const scriptsDir = path.join('scripts', '/')
    return files.some(file => file.startsWith(scriptsDir))
  }
  return !!process.env.CI || commandFilters.length > 0
}

interface Command {
  /**
   * The name of the command.
   */
  name: string
  /**
   * The color of the command prefix.
   */
  color: keyof kleur.Kleur
  /**
   * The command to execute. If an array is provided, the commands
   * will be executed concurrently.
   */
  command: string | (Command | false)[]
  /**
   * A function that is run before the command is executed.
   */
  pre?: (prefix: string) => void | Promise<void>
  /**
   * A function that is run after the command is executed.
   */
  post?: (prefix: string) => void
}

async function runConcurrently(
  commands: (Command | false)[],
  filter: (name: string) => boolean,
  parentPrefix = '',
  procs = new Set<Subprocess>(),
) {
  // Ensure the "MaxListenersExceededWarning" is not logged.
  process.stdout.setMaxListeners(1000)
  process.stderr.setMaxListeners(1000)

  await Promise.all(
    commands.map(async cmd => {
      if (!cmd) {
        return
      }
      const prefix = '[' + cmd.name + ']'
      if (typeof cmd.command === 'string') {
        if (!filter(parentPrefix + prefix)) {
          return
        }

        const argv = parseArgsStringToArgv(cmd.command)
        if (argv[0] !== 'pnpm') {
          argv.unshift('pnpm', '-s')
        }

        const stdoutPrefix = parentPrefix + kleur[cmd.color](prefix)
        const stderrPrefix = parentPrefix + kleur.red(prefix)

        await cmd.pre?.(stdoutPrefix)

        const proc = execa(argv[0], argv.slice(1), { reject: false })

        proc.stdout
          .pipe(createPrefixStream(stdoutPrefix + ' '))
          .pipe(process.stdout)

        proc.stderr
          .pipe(createPrefixStream(stderrPrefix + ' '))
          .pipe(process.stderr)

        procs.add(proc)
        proc.on('exit', (code, signal) => {
          cmd.post?.(stdoutPrefix)

          if (signal === 'SIGINT' || procs.size === 0) {
            return // Interrupted by user or a failed command.
          }

          procs.delete(proc)

          const prefix = code !== 0 ? stderrPrefix : stdoutPrefix
          console.log(
            `${prefix} Process exited with`,
            code != null ? `code ${code}` : `signal ${signal}`,
          )

          if (code !== 0 && procs.size > 0) {
            const remainingProcs = [...procs]
            procs.clear()

            console.log(`${prefix} Sending SIGTERM to other processes...`)
            for (const p of remainingProcs) {
              p.kill()
            }
          }
        })

        await proc
      } else {
        await runConcurrently(
          cmd.command,
          filter,
          parentPrefix + kleur[cmd.color](prefix),
          procs,
        )
      }
    }),
  )
}

function matchFilter(name: string, filters: string[]) {
  if (filters.length === 0) {
    return true
  }
  for (const filter of filters) {
    if (filter[0] === '!') {
      if (name.includes(filter.slice(1))) {
        return false
      }
    } else if (name.includes(filter)) {
      return true
    }
  }
  if (filters.some(f => f[0] !== '!')) {
    return false
  }
  return true
}

async function getChangedFiles(baseCommit: string) {
  const diffResult = await execa('git', [
    'diff',
    '--name-only',
    `${baseCommit}..HEAD`,
  ])

  return diffResult.stdout.trim().split('\n')
}

function createPrefixStream(prefix: string): Transform {
  let incompleteLine = ''

  return new Transform({
    encoding: 'utf8',
    transform(chunk: string, _encoding, callback) {
      const lines = (incompleteLine + chunk).split('\n')
      incompleteLine = lines.pop() || ''

      const prefixedLines = lines.map(line => `${prefix}${line}\n`)
      this.push(prefixedLines.join(''))

      callback()
    },
    flush(callback) {
      if (incompleteLine) {
        this.push(`${prefix}${incompleteLine}\n`)
      }
      callback()
    },
  })
}
