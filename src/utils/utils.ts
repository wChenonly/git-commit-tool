import needsPull from 'git-needs-pull'
import { execa } from 'execa'
import type { Commit } from '../commit/commitType'

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
export function isGitNeedPull() {
  return needsPull()
}

// 获取提交的信息
export function getCommitMessage(info: Commit) {
  let message = `${info.type}`

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
