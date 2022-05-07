# git-commit-tool

使用交互式方法帮助您生成标准提交消息 (use an interactive approach to help you generate standard submission messages)

# 使用方法

## install

install with npm:

```bash
npm install -g git-commit-tool
```

## useage

```bash
终端输入 commit 命令

默认不自动提交到远端仓库。如果需要自动提交到远端仓库

远端仓库分为gerrit需要审核的

以及不需要审核的仓库

如果是推入gerrit需要审核的仓库，则输入
commit --autoPush --isGerrit

如果是不需要审核的仓库，则输入
commit --autoPush
```
