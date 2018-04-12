
// 只允许从相机扫码
wx.scanCode({
    onlyFromCamera: true,
    success: (res) => {
      console.log(res)
    }
  })

res = {
    charSet: "utf-8",
    errMsg:"scanCode:ok",
    result:"817510440:8cpbp7b3",
    scanType:"QR_CODE"
}

// 参数	        类型	    必填	说明	                            最低版本
// onlyFromCamera	Boolean	    否	是否只能从相机扫码，不允许从相册选择图片	1.2.0
// scanType	    Array	    否	扫码类型，参数类型是数组，二维码是'qrCode'，一维码是'barCode'，DataMatrix是‘datamatrix’，pdf417是‘pdf417’。	1.7.0
// success	        Function	否	接口调用成功的回调函数，返回内容详见返回参数说明。	
// fail	        Function	否	接口调用失败的回调函数	
// complete	    Function	否	接口调用结束的回调函数（调用成功、失败都会执行）

// 带路径 的小程序二维码 res :
charSet:"utf-8"
errMsg:"scanCode:ok"
path:"pages/setting/setting?id=5&my=zhaixiang"
result:"https://mp.weixin.qq.com/a/~~w6gvsTpJwkw~x1RwJgt3KVO1RlhgYV2M3A~~"
scanType:"QR_CODE"

charSet:"utf-8"
errMsg:"scanCode:ok"
path:"pages/welcome/welcome?"
result:"https://mp.weixin.qq.com/a/~~KvPx9dolyT4~dbmRROh-jzi_MrSqbVX3KA~~"
scanType:"QR_CODE"

// 没有路径 的小程序二维码
charSet:"utf-8"
errMsg:"scanCode:ok"
result:"https://mp.weixin.qq.com/a/~~wu3hXzBSt64~plUyoOB9Iyf8mEHP9BrkLA~~"
scanType:"QR_CODE"

// 逻辑思维 的 /r/ 后面码也短许多， 不知为什么？
charSet:"utf-8"
errMsg:"scanCode:ok"
result:"http://weixin.qq.com/r/qnWHnwrEZlcZrU789yC4"
scanType:"QR_CODE" 