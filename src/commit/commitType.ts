export interface CommitType {
  readonly label: string
  readonly key?: string
  readonly description: string
}

export interface Commit {
  type: string
  scope?: string
  body: string
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

export default commitType
