/**
 * 页面内执行 Array.from(document.querySelectorAll(selector))，
 *  然后把匹配到的元素数组作为第一个参数传给 pageFunction。
 * 
 * 返回: <Promise<Serializable>> Promise对象，
 *  完成后是 pageFunction 的返回值
 *  如果 pageFunction 返回的是 Promise，
 *  那么此方法会等 promise 完成后返回其返回值。
 * 
 * args参数传入pageFunction的第2个参数开始...
 */
page.$$eval(selector, pageFunction[, ...args]){
  // 传入 元素 数组 ！
}

const divsCounts = await page.$$eval('div', divs => divs.length);

page.$eval(selector, pageFunction[, ...args]){
  // 传入函数的参数是 Element元素
}
/* 
获取 DOM 属性
attr.isId	      如果属性是 ID 类型，则 isId 属性返回 true，否则返回 false。
attr.name	      返回属性名称
attr.value	    设置或者返回属性值
attr.specified	如果属性被指定返回 true ，否则返回 false
 */
const searchValue = await page.$eval('#search', el => el.value)
const preloadHref = await page.$eval('link[rel=preload]', el => el.href)
const html = await page.$eval('.main-container', e => e.outerHTML);
