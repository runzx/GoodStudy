## console控台引入外部js文件

```js
var script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js";
document.getElementsByTagName('head')[0].appendChild(script);
```

```js
var script = document.createElement('script');
script.src = "https://unpkg.com/xlsx/dist/xlsx.full.min.js";
document.getElementsByTagName('head')[0].appendChild(script);
```

`await page.mainFrame().addScriptTag({ url: 'https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js' })`  

```js
var script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/xlsx@0.16.2/dist/xlsx.min.js";
document.getElementsByTagName('head')[0].appendChild(script);
```

``  