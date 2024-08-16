import { execa, type Subprocess } from 'execa'
import kleur from 'kleur'
import { Transform } from 'node:stream'
import parseArgsStringToArgv from 'string-argv'

main()

async function main() {
  await runConcurrently([
    {
      name: 'biome',
      color: 'cyan',
      command: 'biome check ./src ./tests ./benchmarks',
    },
    {
      name: 'jsr',
      color: 'green',
      command: 'dlx deno-bin@1.44.4 lint',
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
        // Avoid linting scripts in CI, because they're not guaranteed
        // to have their dependencies installed.
        !process.env.CI && {
          name: 'scripts',
          color: 'yellow',
          command: 'tsc -p scripts',
        },
      ],
    },
  ])
}

interface Command {
  name: string
  color: keyof kleur.Kleur
  command: string | (Command | false)[]
}

async function runConcurrently(
  commands: (Command | false)[],
  parentPrefix = '',
) {
  const procs = new Set<Subprocess>()
  await Promise.all(
    commands.map(async cmd => {
      if (!cmd) {
        return
      }
      const prefix = '[' + cmd.name + ']'
      if (typeof cmd.command === 'string') {
        const argv = parseArgsStringToArgv(cmd.command)
        if (argv[0] !== 'pnpm') {
          argv.unshift('pnpm', '-s')
        }

        const proc = execa(argv[0], argv.slice(1), { reject: false })

        const stdoutPrefix = parentPrefix + kleur[cmd.color](prefix)
        proc.stdout
          .pipe(createPrefixStream(stdoutPrefix + ' '))
          .pipe(process.stdout)

        const stderrPrefix = parentPrefix + kleur.red(prefix)
        proc.stderr
          .pipe(createPrefixStream(stderrPrefix + ' '))
          .pipe(process.stderr)

        procs.add(proc)
        proc.on('exit', (code, signal) => {
          if (signal === 'SIGINT') {
            return
          }

          const prefix = code !== 0 ? stderrPrefix : stdoutPrefix
          console.log(
            `${prefix} Process exited with`,
            code != null ? `code ${code}` : `signal ${signal}`,
          )
          procs.delete(proc)

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
          parentPrefix + kleur[cmd.color](prefix),
        )
      }
    }),
  )
}

function createPrefixStream(prefix: string): Transform {
  let incompleteLine = ''

  return new Transform({
    encoding: 'utf8',
    transform(chunk: string, encoding, callback) {
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
