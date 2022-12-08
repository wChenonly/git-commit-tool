import inquirer from 'inquirer'
import chalk from 'chalk'
import { execa } from 'execa'
import { Log, getCommitMessage, getGitBranchName } from '../utils/utils'
import { CommitConfig, Commit, CommitType } from './commitType'

export async function commit(config: CommitConfig) {
  const { types: commitTypes = [] } = config

  const types = commitTypes.map((item: CommitType) => {
    return { name: `${item.key}: ${item.description}` }
  })

  // 获取message信息
  const reult: Commit = await inquirer.prompt([
    {
      name: 'type',
      message: '请选择本次提交的修改类型:',
      type: 'list',
      choices: types,
      validate: (value: string) => {
        if (value) {
          return true
        }
        return '修改类型不能为空'
      },
      filter(val) {
        return `${val.split(':')[0]}`
      }
    },
    {
      name: 'scope',
      message: '请输入本次提交的改动范围(可选):',
      type: 'input'
    },
    {
      name: 'subject',
      message: '请输入本次修改内容:',
      type: 'input',
      validate: (value: string) => {
        if (value) {
          return true
        }
        return '本次修改不能为空'
      }
    }
  ])
  console.log('%c [ reult ]韦帆韦帆韦帆-50-「commitInput.ts」', 'font-size:13px; background:#df0b78; color:#ff4fbc;', reult)
  const message = getCommitMessage(reult)

  Log.info(`本次提交的信息为:`, chalk.green(message))

  const { confirmCommit } = await inquirer.prompt([
    {
      name: 'confirmCommit',
      message: '确认要提交本次改动?',
      type: 'confirm'
    }
  ])

  if (!confirmCommit) return

  console.log(chalk.green('提交代码到本地仓库'))
  await execa('git', ['commit', '-m', message], { stdio: 'inherit' })

  const { autoPush } = await inquirer.prompt([
    {
      name: 'autoPush',
      message: '是否要自动push代码?',
      type: 'confirm'
    }
  ])
  // console.warn('confirmAutoPush', autoPush)

  if (autoPush) {
    const pushBranch = getGitBranchName()

    const { isGerrit } = await inquirer.prompt([
      {
        name: 'isGerrit',
        message: '是否是gerrit仓库?',
        type: 'confirm',
        default: false
      }
    ])
    if (isGerrit) {
      // push到gerrit仓库，因为gerrit refs审核
      // git push origin HEAD:refs/for/master
      // repo.push('origin', `HEAD:refs/for/${pushBranch}`)
      await execa('git', ['push', 'origin', `HEAD:refs/for/${pushBranch}`])
    } else {
      // push到其他仓库 git push origin
      await execa('git', ['push', 'origin', `${pushBranch}`])
    }
  } else {
    console.log(chalk.red('别忘记手动推送代码到远端仓库 🫵'))
  }
}

export async function isOpenWindow() {
  const { isOpenWindow } = await inquirer.prompt([
    {
      name: 'isOpenWindow',
      message: '是否自动打开仓库,创建MR?',
      type: 'confirm',
      default: true
    }
  ])
  return isOpenWindow
}
