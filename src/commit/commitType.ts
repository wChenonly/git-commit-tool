export interface CommitType {
  readonly emoji: string
  readonly key: string
  readonly description: string
}

export interface Commit {
  type: string
  scope?: string
  subject: string
}

export interface CommitConfig {
  // 是否自动提交到远程仓库,默认不自动提交
  // autoPush: boolean
  // 是否是提交到gerrit仓库，因为gerrit需要refs审核，所以需要判断是否是gerrit仓库
  // isGerrit: boolean
  // 提交类型
  types?: CommitType[]
}

export const commitType: Array<CommitType> = [
  {
    emoji: '🎉',
    key: 'init',
    description: '初次提交/初始化项目'
  },
  {
    emoji: '💥',
    key: 'feature',
    description: '引入新功能'
  },
  {
    emoji: '🚑',
    key: 'bugfix',
    description: '修复bug'
  },
  {
    emoji: '💄',
    key: 'style',
    description: '更新 UI 和样式文件'
  },
  {
    emoji: '🎨',
    key: 'format',
    description: '改进代码结构/代码格式，不涉及代码逻辑'
  },
  {
    emoji: '📝',
    key: 'docs',
    description: '仅仅修改文档'
  },
  {
    emoji: '🔨',
    key: 'refactor',
    description: '代码重构,没有加新功能或者修复bug'
  },
  {
    emoji: '🚀',
    key: 'perf',
    description: '优化相关，比如提升性能、体验'
  },
  {
    emoji: '✅',
    key: 'test',
    description: '增加测试用例'
  },
  {
    emoji: '👷',
    key: 'ci',
    description: '配置相关/依赖相关/打包相关等'
  }
]

export default commitType
