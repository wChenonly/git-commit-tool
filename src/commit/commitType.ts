export interface CommitType {
  readonly key: string
  readonly description: string
}

export interface Commit {
  type: string
  scope?: string
  subject: string
}

export interface CommitConfig {
  types?: CommitType[]
}

export const commitType: Array<CommitType> = [
  {
    key: '🚑 fix',
    description: 'bug 修复',
  },
  {
    key: '💥 feat',
    description: '新增功能',
  },
  {
    key: '👻 chore',
    description: '日常事务',
  },
  {
    key: '💄 style',
    description: '样式，格式，不影响代码逻辑的',
  },
  {
    key: '📝 docs',
    description: '仅修改文档',
  },
  {
    key: '🔨 refactor',
    description: '代码重构，没有加新功能/修复 bug',
  },
  {
    key: '🚀 perf',
    description: '性能优化',
  },
  {
    key: '✅ test',
    description: '测试相关',
  },
  {
    key: '👷 ci',
    description: '配置相关/依赖相关/打包相关等',
  },
  {
    key: '🔙 revert',
    description: '回退代码',
  },
]

export default commitType
