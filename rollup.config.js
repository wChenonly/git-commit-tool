// 将json转换为ES6模块
import json from '@rollup/plugin-json'

// rollup解析及编译TS插件
import typescript from '@rollup/plugin-typescript'

// rollup文件夹清除插件
import { cleandir } from 'rollup-plugin-cleandir'

export default {
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
    'cac',
    'ora',
    'fs',
    'path',
    'ini',
    'open'
  ]
}
