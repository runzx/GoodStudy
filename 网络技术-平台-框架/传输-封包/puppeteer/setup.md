1. 安装 手动下载 Chromuim  
`npm i --save puppeteer --ignore-scripts`

`https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/575458/chrome-win32.zip`

`revision > 591479 ? 'chrome-win' : 'chrome-win32'`

`https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/756035/chrome-win.zip`

```js
downloadURLs = {
  linux: '%s/chromium-browser-snapshots/Linux_x64/%d/chrome-linux.zip',
  mac: '%s/chromium-browser-snapshots/Mac/%d/chrome-mac.zip',
  win64: '%s/chromium-browser-snapshots/Win_x64/%d/chrome-win.zip'
} 
'%d' = puppeteer.chromium_revision // puppeteer/package.json
```

`win64: 'https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/%d/chrome-win.zip'`

解压路径  
`node_modules\puppeteer\.local-chromium\win64-756035\chrome-win\`

国内镜像  
`npm config set ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"`  
`npm install --loglevel=info`  
--loglevel=info 表示 info 级别的信息也要输出，方便我们了解 npm 的运行情况。

2.  参数  
    headless: false，即可启动其 GUI 界面，进行可视化调试
    timeout： 等待浏览器实例启动的最长时间（以毫秒为单位）。默认为 30000（30 秒）。通过 0 禁用超时
    args： 传递给浏览器实例的其他参数
    减慢速度，slowMo 选项以指定的毫秒减慢 Puppeteer 的操作。
    dumpio 是否将浏览器进程 stdout 和 stderr 导入到 process.stdout 和 process.stderr 中。默认为 false。

3.  Puppeteer 的 API。文档提供了非常丰富的方法不仅支持在网页上点击，而且可以填写表单，读取数据。
    定义点击的函数：
    page.click(selector[, options])
    selector 一个选择器来指定要点击的元素。如果多个元素满足，那么默认选择第一个。
    谷歌开发者工具提供一个可以快速找到选择器元素的方法。在图片上方右击，
    选择检查(Inspect)选项
    选择拷贝(Copy)，然后选择拷贝选择器(Copy selector)。
    接下来将拷贝的选择器插入到函数中。
    await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
    页面内容：
    首选需要使用 page.evaluate()函数。该函数可以让我们使用
    内置的 DOM 选择器，比如 querySelector()。// 返回匹配第一个元素, // $()
            需要与指定选择器匹配的所有元素的列表，则应该使用querySelectorAll() // $\$()。
    const result = await page.evaluate(() => {
    // return something
    });
    使用如下代码可以获取该元素：
    let title = document.querySelector('h1');
    但是，我们真正想要的是里面的文本文字。因此，通过.innerText 来获取。
    let title = document.querySelector('h1').innerText;
    匹配的 ID 或选择器不符合 CSS 语法（比如不恰当地使用了冒号或者空格），你必须用反斜杠将这些字符转义。由于 JavaScript 中，反斜杠是转义字符，所以当你输入一个文本串时，
    你必须将它转义两次（一次是为 JavaScript 字符串转义，另一次是为 querySelector 转义）：
    元素只接用其名字 div p a
    class .
    id #
    通过方括号指定其它属性，如：通过[type='button']可以匹配 type 属性为 button 的元素。
    [attr~=regex]: 利用属性值匹配正则表达式来查找元素，比如： img[src~=(?i)\.(png|jpe?g)]

            A B - 匹配A元素中的子元素B，B可以是A的子节点及子节点的子节点
                A > B - 匹配A元素中的下级子元素B，即：匹配A的直系后代
                A + B - 匹配A元素中的任一下一个兄弟元素B（同级）
                B ~ E - 匹配B元素后面的拥有共同父元素的兄弟元素E
                例：<div>(<div class="user-panel main">)
                        <input name="login"/>
            var el = document.querySelector("div.user-panel.main input[name='login']")

4.  ElementHandle 帮我们封装了常用的 click 、boundingBox 等方法  
    const searchValue = await page.$eval('#search', el => el.value);
        .$eval('link[rel=preload]', el => el.href);
    .$eval('.main-container', e => e.outerHTML);
        .$eval('h3', node => node.innerText)

    evaluate 方法中是无法直接使用外部的变量的，需要作为参数传入，想要获得执行的结果也需要 return 出来。

5.  page.\$() page.evaluate() 是在 Chromuim 里运行，console.log()显示在浏览器的 console 上  
    注意 querySelectorAll 返回的是一个 NodeList，不是一个数组，不是一个可观的 DOM 结构，可以试下打印 obj2，只有加上下标可返回对应元素。
    元素本身也支持 querySelector 和 querySelectorAll
    element.querySelectorAll 不是从 element 开始匹配元素的。而事实上，它会在 element 的子代元素中匹配查询条件

    NodeList 对象在某些方面和数组非常相似，看上去可以直接使用从 Array.prototype 上继承的方法。然而，
    除了 forEach 方法，NodeList 没有这些类似数组的方法。
    方法：forEach 方法之外，还有 item，entries，keys 和 values 方法。

    page.\$\$() 返回 是数组 ！！！
