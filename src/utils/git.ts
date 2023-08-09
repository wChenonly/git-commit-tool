import { execa, execaSync } from 'execa'
import ora from 'ora'
import c from 'kleur'
import { HAND_ICON } from './utils'

export async function commit(message: string) {
  const spinner = ora({ text: 'git commit ...', stream: process.stdout }).start()
  await execa('git', ['commit', '-m', message], { stdio: 'inherit' }).catch(() => {
    spinner.fail(`${c.bgRed('请修复 lint 错误')}`)
    process.exit(1)
  })
  spinner.succeed(`${c.green('git commit succeed 🍺 🍺 🍺')}`)
}

export async function push(currentBranch: string) {
  const spinner = ora('git push ...').start()
  try {
    await execa('git', ['push', 'origin', `${currentBranch}`]).catch(() => {
      spinner.fail(`${c.bgRed(`推送失败，请手动 git push ${HAND_ICON}`)}`)
      process.exit(1)
    })
    spinner.succeed(`${c.green('git push succeed 💯 💯 💯')}`)
    return true
  }
  catch (error) {
    spinner.fail(`${c.bgRed(`推送失败，请手动 git push ${HAND_ICON}`)}`)
    return false
  }
}

export function gitBranchName() {
  return execaSync('git', ['branch', '--show-current']).stdout.trim()
}
