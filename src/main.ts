import * as core from '@actions/core'
import {exec, ExecOptions} from '@actions/exec'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('github-token')
    const dir: string = core.getInput('working-directory')
    const flag: string = core.getInput('flag-name')

    if (!token) {
      throw new Error("'github-token' input missing")
    }

    await installDep()
    await report(flag, dir)
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function installDep(): Promise<void> {
  await exec('cpanm', ['-n', 'Devel::Cover::Report::Coveralls'])
}

async function report(
  flag: string | undefined,
  dir: string | undefined
): Promise<void> {
  const opts: ExecOptions = {}

  if (dir) {
    opts.cwd = dir
  }

  if (flag) {
    opts.env = {
      COVERALLS_FLAG_NAME: flag
    }
  }

  await exec('cover', ['-report', 'coveralls'], opts)
}

run()
