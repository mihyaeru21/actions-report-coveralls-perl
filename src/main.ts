import * as core from '@actions/core'
import {exec} from '@actions/exec'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('github-token')
    const flagName: string = core.getInput('flag-name')

    if (!token) {
      throw new Error("'github-token' input missing")
    }

    await installDep()
    await report(flagName)
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function installDep(): Promise<number> {
  return exec('cpanm', ['-n', 'Devel::Cover::Report::Coveralls'])
}

async function report(flagName: string | undefined): Promise<number> {
  const env: {[key: string]: string} = {}
  if (flagName) {
    env['COVERALLS_FLAG_NAME'] = flagName
  }

  return exec('cover', ['-report', 'coveralls'], {env})
}

run()
