//
const config={
  //`url`是服务器链接，用来请求
  url:'/user',

  //`method`是发起请求时的方法
  method:`get`,

  //`baseURL`如果`url`不是绝对地址，那么将会加在其前面。
  //可以很方便的对相对地址的axios实例设置`baseUrl`。
  baseURL:'http://some-domain.com/api/',

  //`transformRequest`允许请求的数据在发送至服务器之前进行转化。
  //这个只适用于`PUT`,`GET`,`PATCH`方法。
  //数组中的最后一个函数必须返回一个字符串或者一个`ArrayBuffer`,或者`Stream`,`Buffer`实例,`ArrayBuffer`,`FormData`
  //此外你也可能需要设置下headers对象
  transformRequest:[function(data,headers){
      //依自己的需求对请求数据进行处理
      return data;
  }],

  //`transformResponse`允许对返回的数据传入then/catch之前进行处理
  transformResponse:[function(data){
      //依需要对数据进行处理
      return data;
  }],

  //`headers`是自定义的要被发送的信息头
  headers:{'X-Requested-with':'XMLHttpRequest'},

  //`params`是请求连接中的请求参数，必须是一个纯对象，或者URLSearchParams对象
  params:{
      ID:12345
  },
  
  //`paramsSerializer`是一个可选的函数，用来控制和序列化参数
  //例如：（https://ww.npmjs.com/package/qs,http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params){
      return Qs.stringify(params,{arrayFormat:'brackets'})
  },

  //`data`是请求时作为请求体的数据
  //只适用于应用的'PUT','POST','PATCH'，请求方法
  //当没有设置`transformRequest`时，必须是以下其中之一的类型（不可重复？）：
  //-string(字符串),plain object(纯对象),ArrayBuffer,ArrayBufferView,URLSearchParams
  //-限浏览器：FormData(表格数据),File(文件数据),Blob
  //-限Node：Stream
  data:{
      firstName:'fred'
  },
  //`timeout`定义请求的时间，单位是毫秒。
  //如果请求的时间超过这个设定时间，请求将会停止。
  timeout:1000,
  
  //`withCredentials`表明跨跨域请求书否需要证明。
  withCredentials:false, //默认值

  //`adapter`适配器，允许自定义处理请求，这会使测试更简单。
  //返回一个promise，并且提供一个有效的相应。（查看[response docs](#response-api)）
  adapter:function(config){
      /*...*/
  },

  //`auth`表明HTTP基础的认证应该被使用，并且提供证书。
  //这个会设置一个`authorization` 头（header），并且覆盖你在header设置的Authorization头信息。
  auth:{
      username:'janedoe',
      password:'s00pers3cret'
  },

  //`responsetype`表明服务器返回的数据类型，这些类型的设置应该是
  //'arraybuffer','blob','document','json','text',stream'
  responsetype:'json',

  //`responseEncoding`表明解析相应的编码方式。
  //**注意**会忽视responseType为stream或者客户端的请求。
  responseEncoding:'utf8',//默认值

  //`xsrfCookieName`时cookie做xsrf会话时的名字。
  xsrfCookieName:'XSRF-TOKEN',//默认值

  //`xsrfHeaderName` 是http头（header）的名字，并且该头携带xsrf的值
  xrsfHeadername:'X-XSRF-TOKEN',//默认值

  //`onUploadProgress`允许处理上传过程的进程事件
  onUploadProgress: function(progressEvent){
      //本地过程事件发生时想做的事
  },

  //`onDownloadProgress`允许处理下载过程的进程事件
  onDownloadProgress: function(progressEvent){
      //下载过程中想做的事
  },

  //`maxContentLength` 定义http返回内容的最大字节容量
  maxContentLength: 2000,

  //`validateStatus` 定义promise的resolve和reject。
  //http返回状态码，如果`validateStatus`返回true（或者设置成null/undefined），promise将会resolve；其他的promise将reject。
  validateStatus: function(status){
      return status >= 200 && stauts < 300;//默认
  },

  //`maxRedirect`定义重导向到node.js中的最大数量。
  //如果值为0，那么没有redirect。
  maxREdirects:5,//默认值

  //`socketPath`定义一个在node.js中使用的 `UNIX Socket`。
  //例如 `/var/run/docker.sock`发送请求到docker daemon。
  //`socketPath`和`proxy`只可定义其一。
  //如果都定义则只会使用`socketPath`。
  socketPath:null,//默认值

  //`httpAgent` 和 `httpsAgent`当产生一个http或者https请求时分别定义一个自定义的代理，在nodejs中。
  //这个允许设置一些选选个，像是`keepAlive`--这个在默认中是没有开启的。
  httpAgent: new http.Agent({keepAlive:treu}),
  httpsAgent: new https.Agent({keepAlive:true}),

  //`proxy`定义服务器的主机名字和端口号。
  //`auth`表明HTTP基本认证应该跟`proxy`相连接，并且提供证书。
  //这个将设置一个'Proxy-Authorization'头(header)，覆盖原先自定义的。
  proxy:{
      host:'127.0.0.1',
      port:9000,
      auth:{
          username:'cdd',
          password:'123456'
      }
  },

  //`cancelTaken` 定义一个取消，能够用来取消请求
  //（查看 下面的Cancellation 的详细部分）
  cancelToken: new CancelToken(function(cancel){
  })
}

request(config).then(res=>{

})