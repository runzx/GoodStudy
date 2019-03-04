
var COS = require('./lib/cos-wx-sdk-v5');
var config = {
  Bucket: 'cd-1256314569',
  Region: 'ap-chengdu'
};
var getAuthorization = function(options, callback) {
  // 方法一、后端通过获取临时密钥给到前端，前端计算签名
  wx.request({
    method: 'GET',
    header: {
      bisid: '5b8129adf889de57ac494f6f',
    },
    // url: 'https://example.com/cos-js-sdk-v5/server/sts.php', // 服务端签名，参考 server 目录下的两个签名例子
    url: 'http://localhost:3000/api/v2/STS',
    dataType: 'json',
    success: function(result) {
      var data = result.data.data
      callback({
        TmpSecretId: data.credentials && data.credentials.tmpSecretId,
        TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
        XCosSecurityToken: data.credentials && data.credentials.sessionToken,
        ExpiredTime: data.expiredTime,
      });
    }
  });
  var cos = new COS({
  getAuthorization: getAuthorization,
});

// 回调统一处理函数
var requestCallback = function(err, data) {
  console.log(err || data);
  if (err && err.error) {
    wx.showModal({
      title: '返回错误',
      content: '请求失败：' + (err.error.Message || err.error) + '；状态码：' + err.statusCode,
      showCancel: false
    });
  } else if (err) {
    wx.showModal({
      title: '请求出错',
      content: '请求出错：' + err + '；状态码：' + err.statusCode,
      showCancel: false
    });
  } else {
    wx.showToast({
      title: '请求成功',
      icon: 'success',
      duration: 3000
    });
  }
};

// 展示的所有接口
var dao = {
  // 取目录
  getBucket: function() {
    cos.getBucket({
      Bucket: config.Bucket,
      Region: config.Region,
      // 前缀匹配，用来规定返回的文件前缀地址
      Prefix:'pd123\/5b812ab8262ca755c438c7a3\/',
    }, requestCallback);
  },

}
// 
const Contents = [{
  ETag:"d6658ee931e117d6c9414a267569b953",
  Key:"test/wx2565bfd15aa0f85c.o6zAJs-e8xwpdFmYNgvwAvKHWMsk.friGWtoEcY92d6658ee931e117d6c9414a267569b953.png",
  LastModified:"2018-03-23T13:17:56.000Z",
  Owner:{DisplayName:"1256314569",
  ID:"1256314569",
  Size:"731",
  StorageClass:"STANDARD"}
}
]
,b=
  {Marker:"",
  MaxKeys:"1000",
  Name:"cd-1256314569",
  Prefix:"pd123/5b812ab8262ca755c438c7a3/"

}

Prefix	前缀匹配，用来规定返回的文件前缀地址	String	否
Delimiter	定界符为一个分隔符号，一般是传 "/"，如果有 Prefix，则将 Prefix 到 delimiter 之间的相同路径归为一类，定义为 Common Prefix，然后列出所有 Common Prefix。如果没有 Prefix，则从路径起点开始	String	否
Marker	默认以 UTF-8 二进制顺序列出条目，所有列出条目从 marker 开始	String	否
MaxKeys	单次返回最大的条目数量，默认1000
