import * as core from '@actions/core'
import {exec} from '@actions/exec'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('github-token')
    if (!token) {
      throw new Error("'github-token' input missing")
    }

    await installDep()
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function installDep(): Promise<void> {
  await exec('cpanm', ['-n', 'Devel::Cover::Report::Coveralls'])
}

run()
