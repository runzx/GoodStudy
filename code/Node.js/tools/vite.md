# vite 

## Rollup 插件兼容性

1. 相当数量的 Rollup 插件将直接作为 Vite 插件工作（例如：@rollup/plugin-alias 或 @rollup/plugin-json, @rollup/plugin-commonjs
2. rollup-plugin-terser 已可以
3. 它的工作原理与 Vite 插件的 `enforce: 'post'` 和 `apply: 'build'` 相同

```js
// vite.config.js
import example from 'rollup-plugin-example'
import {
    defineConfig
} from 'vite'

export default defineConfig({
    plugins: [{
        ...example(),
        enforce: 'post',
        apply: 'build'
    }]
})
```
