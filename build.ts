import { type BuildOptions, build } from 'esbuild'
import chalk from 'chalk'

async function bundle() {
  const options: BuildOptions = {
    format: 'esm',
    bundle: true,
    entryPoints: ['src/cli.ts'],
    minify: true,
    platform: 'node',
    outdir: 'es',
    treeShaking: true,
    splitting: true,
    external: ['chalk', 'is-git-repository', 'is-git-added', '@clack/prompts', 'execa', 'git-needs-pull', 'cac', 'ora', 'fs', 'path', 'ini', 'open'],
    tsconfig: './tsconfig.json',
  }

  try {
    await build(options)
    console.log(chalk.green('😊 Build success'))
  }
  catch (error) {
    console.log(chalk.red('😢 Build failed', error))
  }
}

bundle()
