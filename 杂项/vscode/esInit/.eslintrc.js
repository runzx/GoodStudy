module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    mongo: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 6
  },
  extends: ['eslint:recommended']
}
