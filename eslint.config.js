import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
  },
  ignores: ['instructions', 'lib', 'es', 'bin'],
})
