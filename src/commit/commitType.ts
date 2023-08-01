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
    key: '🎉 init',
    description: '初次提交/初始化项目',
  },
  {
    key: '💥 feature',
    description: '引入新功能',
  },
  {
    key: '🚑 bugfix',
    description: '修复 bug',
  },
  {
    key: '💄 style',
    description: '更新 UI',
  },
  {
    key: '🎨 format',
    description: '代码结构/格式，不涉及逻辑',
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
    key: '🚀 performance',
    description: '优化相关，如提升性能、体验',
  },
  {
    key: '✅ test',
    description: '测试相关',
  },
  {
    key: '👷 ci',
    description: '配置相关/依赖相关/打包相关等',
  },
]

export default commitType
