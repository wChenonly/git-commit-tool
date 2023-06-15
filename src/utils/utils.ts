import fs from 'node:fs'
import path from 'node:path'
import isAdded from 'is-git-added'
import isGit from 'is-git-repository'
import needsPull from 'git-needs-pull'
import ini from 'ini'
import type { Commit } from '../commit/commitType'

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

// 获取提交的信息
export function getCommitMessage(info: Commit) {
  let message = `${info.type}`

  if (info.scope)
    message += `(${info.scope}): ${info.subject}`
  else message += `: ${info.subject}`

  return message
}

export function getUrl(): string {
  const configPath = path.resolve(process.cwd(), '.git/config')
  const file = fs.readFileSync(configPath, 'utf8')
  return ini.parse(file)['remote "origin"'].url.replace(/\.git$/, '')
}
