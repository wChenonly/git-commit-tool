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
  types?: CommitType[]
}
export declare const commitType: Array<CommitType>
export default commitType
