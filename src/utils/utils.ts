import chalk from 'chalk'
import isAdded from 'is-git-added'
import isGit from 'is-git-repository'
import needsPull from 'git-needs-pull'
import branchName from 'current-git-branch'

import { Commit } from '../commit/commitType'

// 检查是否存在暂存文件
export function isExitAddFile() {
  return !isAdded()
}

// 检查是否是git仓库
export function isGitRep() {
  return !isGit()
}

// 检查Git存储库是否需要拉取
export function isGitNeedPull() {
  return needsPull()
}

// 获取当前分支名字
export function getGitBranchName() {
  return branchName()
}

// 控制台输出封装
export const Log = {
  info(...args: unknown[]) {
    console.log(chalk.cyan('Info:'), chalk.cyan(...args))
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellow('Warn:'), chalk.yellow(...args))
  },
  error(...args: unknown[]) {
    console.log(chalk.red('Error:'), chalk.red(...args))
  }
}

//获取提交的信息
export const getCommitMessage = (info: Commit) => {
  let message = `${info.type}`

  if (info.scope) {
    message += `(${info.scope}): ${info.body}`
  } else {
    message += `: ${info.body}`
  }

  return message
}
