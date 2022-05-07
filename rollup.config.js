/* eslint-disable @typescript-eslint/no-var-requires */

// 将json转换为ES6模块
const json = require('@rollup/plugin-json')

// rollup解析及编译TS插件
const typescript = require('@rollup/plugin-typescript')

// rollup文件夹清除插件
const { cleandir } = require('rollup-plugin-cleandir')

module.exports = {
  input: ['./src/cli.ts'],
  output: {
    dir: './lib',
    format: 'es'
  },
  plugins: [
    cleandir('./lib'),
    json(),
    typescript({
      module: 'esnext',
      exclude: ['./node_modules/**']
    })
  ],
  // 排除打包的模块
  external: [
    'chalk',
    'is-git-repository',
    'is-git-added',
    'inquirer',
    'execa',
    'git-needs-pull',
    'current-git-branch',
    'cac'
  ]
}
