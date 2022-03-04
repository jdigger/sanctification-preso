module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': 0,
    'no-undef': 0,
    'no-console': 0,
    'no-fallthrough': 0,
    'prettier/prettier': 'error'
  },
}