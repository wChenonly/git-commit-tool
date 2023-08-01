import { execa, execaSync } from 'execa'
import ora from 'ora'
import c from 'kleur'

export async function add() {
  const spinner = ora('git add ...').start()
  await execa('git', ['add', 'package.json'])
  spinner.succeed(`${c.green('git add succeed 🤥🤥🤥')}`)
}
export async function commit(message: string) {
  const spinner = ora('git commit ...').start()
  await execa('git', ['commit', '-m', message], { stdio: 'inherit' })
  spinner.succeed(`${c.green('git commit succeed 🍺🍺🍺')}`)
}

export async function push(currentBranch: string) {
  const spinner = ora('git push ...').start()
  try {
    await execa('git', ['push', 'origin', `${currentBranch}`])
    spinner.succeed(`${c.green('git push succeed 💯💯💯')}`)
    return true
  }
  catch (error) {
    spinner.fail(`${c.green('推送失败，请手动 git push 🫵🫵🫵')}`)
    return false
  }
}

export function gitBranchName() {
  return execaSync('git', ['branch', '--show-current']).stdout
}
