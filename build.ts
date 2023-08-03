import { type BuildOptions, build } from 'esbuild'
import c from 'kleur'

async function bundle() {
  const options: BuildOptions = {
    format: 'esm',
    bundle: true,
    entryPoints: ['src/cli.ts'],
    logLevel: 'info',
    minify: true,
    platform: 'node',
    outdir: 'es',
    treeShaking: true,
    splitting: true,
    external: ['kleur', '@clack/prompts', 'execa', 'cac', 'ora', 'open'],
    tsconfig: './tsconfig.json',
  }
  await build(options).catch((error) => {
    console.log(c.red(`'😢 Build failed ${error}`))
  })
  console.log(c.green('😊 Build success'))
}

bundle()
