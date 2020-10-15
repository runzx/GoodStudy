## node.js 实现 formdata 上传文件

1. XMLHttpRequest Level 2 添加了一个新的接口——FormData
2. FormData 的最大优点就是我们可以异步上传二进制文件
3. method

```js
// 创建一个空FormData对象：
var formData = new FormData()
// 使用FormData.append添加一个键/值对：
formData.append('username', 'Chris')

for (const [key, value] of formData) {
  // formData.entries() == formData
  console.log(key + ', ' + value)
}
```
