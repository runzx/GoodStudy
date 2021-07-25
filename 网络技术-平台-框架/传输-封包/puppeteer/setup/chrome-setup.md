## 国内下载安装 Puppeteer 的方法

1. cnpm 的镜像地址下载
   `PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org npm install puppeteer`

2. 安装 puppeteer-core

```js
const puppeteer = require('puppeteer-core')

const browserFetcher = puppeteer.createBrowserFetcher()
// const revisionInfo = await browserFetcher.download('533271')

const version = '800071'

const start = async () => {
  let res = await browserFetcher.revisionInfo(version)
  console.log('res:', res)
}
start()
```

3. puppeteet 5.3+ chrome-win.zip x64 不再 -win32.zip !

```js
const downloadURLs = {
  chrome: {
    linux: '%s/chromium-browser-snapshots/Linux_x64/%d/%s.zip',
    mac: '%s/chromium-browser-snapshots/Mac/%d/%s.zip',
    win32: '%s/chromium-browser-snapshots/Win/%d/%s.zip',
    win64: '%s/chromium-browser-snapshots/Win_x64/%d/%s.zip'
  },
  firefox: {
    linux: '%s/firefox-%s.en-US.%s-x86_64.tar.bz2',
    mac: '%s/firefox-%s.en-US.%s.dmg',
    win32: '%s/firefox-%s.en-US.%s.zip',
    win64: '%s/firefox-%s.en-US.%s.zip'
  }
}
const browserConfig = {
  chrome: {
    host: 'https://storage.googleapis.com',
    destination: '.local-chromium'
  },
  firefox: {
    host: 'https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central',
    destination: '.local-firefox'
  }
}

// reversions: ./puppeteer/lib/cjs/puppeteer/revisions.js :

exports.PUPPETEER_REVISIONS = {
  chromium: '800071',
  firefox: 'latest'
}

// Windows archive name changed at r591479.
return parseInt(revision, 10) > 591479 ? 'chrome-win' : 'chrome-win32'

const url = util.format(
  downloadURLs[product][platform],
  host,
  revision,
  archiveName(product, platform, revision)
)
```
