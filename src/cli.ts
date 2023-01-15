import cac from 'cac'
import ora from 'ora'
import { Log, isExitAddFile, isGitRep, isGitNeedPull, getUrl } from './utils/utils'
import { CommitConfig, commitType } from './commit/commitType'
import { commit, isOpenWindow } from './commit/commitInput'
import { version } from '../package.json'
import open from 'open'

const cli = cac('commit')

// cli命令数组
cli.commands = [
  cli
    .command('', `写完代码以后，终端输入-->  commit  <--然后尽情享受吧 🎉`)
    // .option(
    //   'autoPush',
    //   '是否自动提交到远程仓库,默认为false (Automatically push to remote after committing, default is false)',
    //   {
    //     default: false
    //   }
    // )
    // .option('isGerrit', '是否是gerrit仓库,默认为false (Is gerrit repository, default is false)', {
    //   default: false
    // })
    .action(() => {
      Log.info('开始提交代码...')
      const config: CommitConfig = {}
      config.types = commitType

      if (isGitRep()) {
        Log.error('不是git仓库,请先切换到git仓库')
        return
      }

      const spinner = ora({
        color: 'green',
        text: '正在检查是否有未更新代码'
      }).start()

      if (isGitNeedPull()) {
        spinner.fail()
        Log.error('有未更新的代码,请先git pull更新代码')
        return
      } else {
        spinner.succeed()
      }

      if (isExitAddFile()) {
        Log.error('暂存区为空,请先git add . 提交代码到暂存区')
        return
      }

      commit(config)
        .then(() => {
          Log.info('提交成功 🎉')
          const openWindowResult = isOpenWindow()
          openWindowResult
            .then(res => {
              if (res) {
                open(getUrl())
                Log.info('打开浏览器成功 🎉')
                process.exit(0)
              } else {
                Log.info('记得去仓库创建合并请求 😄')
                process.exit(0)
              }
            })
            .catch(err => {
              Log.error('打开浏览器失败,记得去仓库创建合并请求 😢', err, getUrl())
              process.exit(1)
            })
        })
        .catch(err => {
          Log.error('提交失败 😢', err)
          process.exit(1)
        })
    })
]

cli.help()
cli.version(version)

// 解析命令行参数
cli.parse()
