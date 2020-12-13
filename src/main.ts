import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('github-token')

    if (!token) {
      throw new Error("'github-token' input missing");
    }

    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
