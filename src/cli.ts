import cac from 'cac'
import ora from 'ora'
import c from 'kleur'
import { version } from '../package.json'
import { isExitAddFile, isGitNeedPull, isGitRep } from './utils/utils'
import type { CommitConfig } from './commit/commitType'
import { commitType } from './commit/commitType'
import { commitTool, isOpenWindow } from './commit/commitInput'

const cli = cac('commit')

// cli命令数组
cli.commands = [
  cli.command('', '写完代码以后，终端输入-->  commit  <--然后尽情享受吧 🎉').action(async () => {
    if (isGitRep()) {
      console.log(c.bgRed('不是git仓库,请先切换到git仓库'))
      return
    }
    console.log(c.green('开始提交代码...'))

    const config: CommitConfig = {}
    config.types = commitType

    const spinner = ora({ color: 'green', text: '正在检查是否有未更新代码' }).start()

    if (isGitNeedPull()) {
      spinner.fail()
      console.log(c.bgRed('有未更新的代码,请先git pull更新代码'))
      return
    }
    else {
      spinner.succeed()
    }

    if (isExitAddFile()) {
      console.log(c.bgRed('暂存区为空,请先git add . 提交代码到暂存区'))
      return
    }

    const res = await commitTool(config)
    if (res)
      await isOpenWindow()
  }),
]

cli.help()
cli.version(version)
cli.parse()
