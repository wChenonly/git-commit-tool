import { Commit } from '../commit/commitType'
export declare function isExitAddFile(): boolean
export declare function isGitRep(): boolean
export declare function isGitNeedPull(): boolean
export declare function getGitBranchName(): any
export declare const Log: {
  info(...args: unknown[]): void
  warn(...args: unknown[]): void
  error(...args: unknown[]): void
}
export declare const getCommitMessage: (info: Commit) => string
