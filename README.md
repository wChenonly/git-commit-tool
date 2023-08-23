# @wchenonly/git-commit-tool

用交互式方法帮助您生成标准提交消息

# 使用方法

## install

install with npm:

```bash
npm install -g @wchenonly/git-commit-tool
```

## useage

```bash
写完代码以后，终端输入 commit 命令
尽情享受吧 🎉🎉🎉
```

![demo](./demo/demo.gif)

使用 [t-rec](https://github.com/sassman/t-rec-rs) 生成。

## 说明：gerrit push 代码

### [gerrit 的规则](https://gerrit-documentation.storage.googleapis.com/Documentation/3.5.1/concept-refs-for-namespace.html)

```javascript
`git push <remote 名字> <本地分支的名字> : <远程库的名字>`

`git push origin HEAD:refs/for/master
`
`git push` 是推送
`origin`是远程的库的名字
`HEAD` 是一个特别的指针，它是一个指向你正在工作的本地分支的指针，可以把它当做本地分支的别名，`git` 这样就可以知道你工作在哪个分支
`refs/for` 意义在于我们提交代码到服务器之后是需要经过 `code review` 之后才能进行 `merge` 的
`refs/heads` 不需要

因此在提交代码中，如果选择自动`push`代码，后面会让你确定是不是`push`到`gerrit`仓库的，默认不是
```
