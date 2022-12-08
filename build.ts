import esbuild from 'esbuild'
import chalk from 'chalk'

esbuild
  .build({
    entryPoints: ['src/cli.ts'],
    bundle: true,
    outdir: 'es',
    external: ['chalk', 'is-git-repository', 'is-git-added', 'inquirer', 'execa', 'git-needs-pull', 'current-git-branch', 'cac', 'ora', 'fs', 'path', 'ini', 'open'],
    format: 'esm',
    tsconfig: './tsconfig.json',
    minify: true,
    splitting: true
  })
  .then(() => {
    console.log(chalk.green('😊 Build success'))
  })
  .catch(() => {
    console.log(chalk.red('😢 Build failed'))
  })
