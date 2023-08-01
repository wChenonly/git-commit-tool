import c from 'kleur'
import { cancel, confirm, isCancel, select, text } from '@clack/prompts'
import open from 'open'
import { commit, gitBranchName, push } from '../utils/git'
import { getCommitMessage, getUrl } from '../utils/utils'
import type { Commit, CommitConfig, CommitType } from './commitType'

const noPush = '别忘记手动推送代码到仓库哦 🫵'

export async function commitTool(config: CommitConfig) {
  const { types: commitTypes = [] } = config

  const types = commitTypes.map((item: CommitType) => {
    return { value: `${item.key}: ${item.description}`, label: `${item.key}: ${item.description}` }
  })

  const selectValue: any = await select({
    message: '请选择本次提交的修改类型:',
    options: types,
  })
  cancel_(selectValue)

  const scopeValue = await text({
    message: '请输入改动范围(可选):',
    placeholder: 'xx文件/函数/页面',
  })
  cancel_(scopeValue)

  const subjectValue = await text({
    message: '请输入修改内容:',
    placeholder: '如"修改了xxx函数"，"重构了xxx页面"等',
    validate(value) {
      if (!value)
        return c.red().bold('本次修改不能为空 🚔🚔🚔')
    },
  })

  cancel_(subjectValue)

  const result: Commit = { type: `${selectValue.split(':')[0]}`, scope: scopeValue as string, subject: subjectValue as string }

  const message = getCommitMessage(result)
  console.log('本次提交的信息为->>', c.green().bold().underline(`${message}`))

  const confirmCommit = await confirm({ message: '确认提交本次改动 ？' })
  cancel_(confirmCommit)

  if (!confirmCommit)
    return

  await commit(message)

  const autoPush = await confirm({ message: '是否要自动提交代码 ？' })
  cancel_(autoPush, `${noPush}`)

  if (autoPush) {
    const pushBranch = gitBranchName()
    const isGerrit = await confirm({ message: '是否是 gerrit 仓库 ？', initialValue: false })
    cancel_(isGerrit, `${noPush}`)
    // push到gerrit仓库，因为gerrit refs审核
    const pushResult = await push(isGerrit ? `refs/for/${pushBranch}` : pushBranch)
    if (pushResult)
      return true
    return false
  }
  else {
    console.log(c.bgRed(`${noPush}`))
  }
}

export async function isOpenWindow() {
  const isOpenWindow = await confirm({ message: '是否自动打开仓库，创建合并请求 ？', initialValue: false })
  cancel_(isOpenWindow, '记得去仓库创建合并请求 🫵🫵🫵')
  if (isOpenWindow) {
    open(await getUrl())
    console.log(c.green('打开浏览器成功 🎉🎉🎉'))
    process.exit(1)
  }
}

function cancel_(message: symbol | boolean | string, info?: string) {
  if (isCancel(message)) {
    if (info)
      cancel(info)
    else cancel('取消提交')
    process.exit(1)
  }
}
