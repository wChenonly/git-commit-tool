import cac from 'cac'
import { Log, isExitAddFile, isGitRep, isGitNeedPull } from './utils/utils'
import { CommitConfig } from './commit/commitType'
import { commit } from './commit/commitinput'
import { commitType } from './commit/commitType'
import { version } from '../package.json'

const cli = cac('commit')

// cli命令数组
cli.commands = [
  cli
    .command('', `commit [...Options]`)
    .option(
      'autoPush',
      '是否自动提交到远程仓库,默认为false (Automatically push to remote after committing, default is false)',
      {
        default: false
      }
    )
    .option('isGerrit', '是否是gerrit仓库,默认为false (Is gerrit repository, default is false)', {
      default: false
    })
    .action((opts: CommitConfig) => {
      Log.info('开始提交代码...')

      if (isGitRep()) {
        Log.error('不是git仓库,请先切换到git仓库 (Not a git repository, please switch to git repository)')
        return
      }

      if (isGitNeedPull()) {
        Log.error(
          'git存储库需要拉取,请先git pull命令,再执行该命令 (git repository needs pull, please git pull first, then execute this command)'
        )
        return
      }

      if (isExitAddFile()) {
        Log.error(
          '存在暂存文件,请先git add命令,在执行该命令 (There are uncommitted files, please git add first,then execute this command)'
        )
        return
      }
      const config: CommitConfig = {
        ...opts
      }
      // console.warn('opts参数', config)

      config.types = commitType

      commit(config)
        .then(() => {
          Log.info('提交成功 🎉')
          process.exit(0)
        })
        .catch(() => {
          Log.error('提交失败 😢')
          process.exit(1)
        })
    })
]

cli.help()
cli.version(version)

// 解析命令行参数
cli.parse()
