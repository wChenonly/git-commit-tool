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
  types?: CommitType[]
}
export declare const commitType: Array<CommitType>
export default commitType
