module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true, // Promise才不会报没定义
    mongo: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 6
  },
  extends: ['eslint:recommended'],
  globals: {
    wx: false,
    getApp: false
  }
}
