import cac from 'cac'
import chalk from 'chalk'
import isAdded from 'is-git-added'
import isGit from 'is-git-repository'
import needsPull from 'git-needs-pull'
import branchName from 'current-git-branch'
import inquirer from 'inquirer'
import { execa } from 'execa'

// 检查是否存在暂存文件
function isExitAddFile() {
  return !isAdded()
}
// 检查是否是git仓库
function isGitRep() {
  return !isGit()
}
// 检查Git存储库是否需要拉取
function isGitNeedPull() {
  return needsPull()
}
// 获取当前分支名字
function getGitBranchName() {
  return branchName()
}
// 控制台输出封装
const Log = {
  info(...args) {
    console.log(chalk.cyan('Info:'), chalk.cyan(...args))
  },
  warn(...args) {
    console.log(chalk.yellow('Warn:'), chalk.yellow(...args))
  },
  error(...args) {
    console.log(chalk.red('Error:'), chalk.red(...args))
  }
}
//获取提交的信息
const getCommitMessage = (info) => {
  let message = `${info.type}`
  if (info.scope) {
    message += `(${info.scope}): ${info.body}`
  } else {
    message += `: ${info.body}`
  }
  return message
}

async function commit(config) {
  const { types: commitTypes = [] } = config
  const types = commitTypes.map((item) => {
    return { name: `${item.label}: ${item.description}` }
  })
  // 获取message信息
  const reult = await inquirer.prompt([
    {
      name: 'type',
      message: '请选择本次提交的修改类型:',
      type: 'list',
      choices: types,
      validate: (value) => {
        if (value) {
          return true
        }
        return '修改类型不能为空'
      }
    },
    {
      name: 'scope',
      message: '请输入本次提交的改动范围(可选):',
      type: 'input'
    },
    {
      name: 'body',
      message: '请输入本次修改内容:',
      type: 'input',
      validate: (value) => {
        if (value) {
          return true
        }
        return '本次修改不能为空'
      }
    }
  ])
  const message = getCommitMessage(reult)
  Log.info(`本次提交的信息为: `, chalk.green(message))
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
      // push到其他仓库
      // git push origin master
      await execa('git', ['push'])
    }
  } else {
    console.log(chalk.red('⚠️   别忘记手动推送代码到远端仓库'))
  }
  // if (autoPush) {
  //   console.log(chalk.green('提交代码到远端仓库,要确认是否是gerrit仓库'))
  //   const pushBranch = getGitBranchName()
  //   if (isGerrit) {
  //     // push到gerrit仓库，因为gerrit refs审核
  //     // git push origin HEAD:refs/for/master
  //     // repo.push('origin', `HEAD:refs/for/${pushBranch}`)
  //     await execa('git', ['push', 'origin', `HEAD:refs/for/${pushBranch}`])
  //   } else {
  //     // push到其他仓库
  //     // git push origin master
  //     await execa('git', ['push'])
  //   }
  // } else {
  //   console.log(chalk.red('⚠️   别忘记手动推送代码到远端仓库'))
  // }
}

const commitType = [
  {
    label: '🎉 init',
    key: 'init',
    description: '初次提交/初始化项目'
  },
  {
    label: '✨ feature',
    key: 'feature',
    description: '引入新功能'
  },
  {
    label: '🚑 fix',
    key: 'fix',
    description: '修复bug'
  },
  {
    label: '💄 style',
    key: 'style',
    description: '更新 UI 和样式文件'
  },
  {
    label: '🎨 format',
    key: 'format',
    description: '改进代码结构/代码格式，不涉及代码逻辑'
  },
  {
    label: '📝 docs',
    key: 'docs',
    description: '仅仅修改文档'
  },
  {
    label: '🛠  refactor',
    key: 'refactor',
    description: '代码重构,没有加新功能或者修复bug'
  },
  {
    label: '🚀 perf',
    key: 'perf',
    description: '优化相关，比如提升性能、体验'
  },
  {
    label: '💉 test',
    key: 'test',
    description: '增加测试用例'
  },
  {
    label: '👷 ci',
    key: 'ci',
    description: '配置相关/依赖相关/打包相关等'
  }
]

var version = '1.1.2'

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
      const config = {}
      // console.warn('opts参数', config)
      config.types = commitType
      commit(config)
        .then(() => {
          Log.info('提交成功 🎉')
          process.exit(0)
        })
        .catch((err) => {
          Log.error('提交失败 😢', err)
          process.exit(1)
        })
    })
]
cli.help()
cli.version(version)
// 解析命令行参数
cli.parse()
