# Commitlint 校验你的 message
1. lint commit messages
2. 需要一份校验的配置 推荐 @commitlint/config-conventional (符合 Angular团队规范).
3. npm i -D @commitlint/config-conventional @commitlint/cli
4. 项目目录下创建配置文件 .commitlintrc.js

```js
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'subject-empty': [2, 'never'],
    'type-enum': [2,'always',['feat','docs','refactor','test']]
  }
};

```

### 针对自定义的 Adapter 进行 Lint
1. npm i -D commitlint-config-cz @commitlint/cli
2. .commitlintrc.js 


```js
module.exports = {
  extends: [
    'cz'
  ],
  rules: {
  }
};
```