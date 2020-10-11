## imgUrl 保存图片路径，然后使用<img>标签去展示图片

`<img :src="imgUrl">`

1. 把图片放在 src 同级的 static 文件夹下。
2. 把图片放在 cdn 上，把网络地址存在 imgUrl 里。
3. 图片放在 assets 文件夹，然后在 data 里面 `imgUrl:require('./assets/logo.png')` (CommonJS 只允许使用字符串字面量)
4. `import imgUrl from '../assets/user.png'`
5. css `background:url(img/1.d1efbb3.jpg);`

### webpack

1. webpack 打包后，会将静态资源文件放在 dist/static/img 下
2. 我们的网站实际上以 dist 目录作为根目录，并由此加载该目录下的 index.html 所需的 css、js、img 等。
