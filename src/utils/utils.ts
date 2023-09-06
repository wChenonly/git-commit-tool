import { execa } from 'execa'
import type { Commit } from '../commit/commitType'
import { gitBranchName } from './git'

// 检查是否存在暂存文件
export async function isExitAddFile() {
  try {
    await execa('git', ['diff', '--cached', '--exit-code'])
    return false
  }
  catch (error) {
    return true
  }
}

// 检查是否是git仓库
export async function isGitRep() {
  try {
    await execa('git', ['rev-parse', '--is-inside-work-tree'])
    return true
  }
  catch (error) {
    return false
  }
}

// 检查Git存储库是否需要拉取
export async function isGitNeedPull() {
  try {
    const branch = gitBranchName()
    const LOCAL = await execa('git', ['log', `${branch}`, '-n 1 --pretty=format:"%H"']).then(res => res.stdout)
    const REMOTE = await execa('git', ['log', `remotes/origin/${branch}`, '-n 1 --pretty=format:"%H"']).then(res => res.stdout)

    if (LOCAL === REMOTE)
      return true
    return false
  }
  catch (error) {
    return false
  }
}

// 获取提交的信息
export function getCommitMessage(info: Commit) {
  let message = info.type.split(' ')[1]

  if (info.scope)
    message += `(${info.scope}): ${info.subject}`
  else message += `: ${info.subject}`

  return message
}

export async function getUrl(): Promise<string> {
  const url = await execa('git', ['config', '--get', 'remote.origin.url']).then(res => res.stdout)

  const _url = url.replace('.git', '').replace('.com:', '.com/').replace('git@', 'https://').trim()

  return _url
}

// 空格，防止渲染不全
export const HAND_ICON = '🫵  🫵  🫵  '
