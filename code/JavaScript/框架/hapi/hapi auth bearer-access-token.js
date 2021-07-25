import { request } from 'http';

/*
hapi身份验证令牌

1. 低于v17的hapi版本，您必须使用此模块的v5.xx版本
'bearer-access-token' scheme :
    validateFunc - (required) 
        token - the auth token received from the client.
        callback - a callback function with the signature 
            function(err, isValid, credentials)
                err - an internal error.
                isValid - true if both the username was found and the password matched, otherwise false.
                credentials - a credentials object passed back to the application in request.auth.credentials. Typically, credentials are only included when isValid is true, but there are cases when the application needs to know who tried to authenticate even when it fails (e.g. with authentication mode 'try').
                    传递回应用程序中的凭证对象request.auth.credentials。
                    通常情况下，credentials只包括当isValid是true
                artifacts - optional authentication related data that is not part of the user's credential.

    options - (optional)
        accessTokenName (Default: 'access_token') - Rename the token query parameter key e.g. 'sample_token_name' would rename the token query parameter to /route1?sample_token_name=12345678.
            （默认：'access_token'） - 重命名令牌查询参数键例如'sample_token_name'会将令牌查询参数重命名为
                /route1?sample_token_name=12345678
        allowQueryToken (Default: true) - Disable accepting token by query parameter, forcing token to be passed in through authorization header.
        allowMultipleHeaders (Default: false) - Allow multiple authorization headers in request, e.g. 
            Authorization: FD AF6C74D1-BBB2-4171-8EE3-7BE9356EB018; Bearer 12345678
        tokenType (Default: 'Bearer') - Allow custom token type, e.g. 
            Authorization: Basic 12345678

2. demo
*/
    validateFunc中可用this访问request对象。如果你想使用这个，你必须使用function关键字，而不是箭头语法。

    
    validateFunc() cb()返回值可以在request.auth.credentials, request.auth.credentials 里取到。 
        Returns an object { isValid, credentials, artifacts }
            isValid     true if token is valid
            credentials - a credentials object passed back to the application in request.auth.credentials.
            artifacts   - optional authentication related data that is not part of the user's credential.
    如果没传token, 系统不调用validateFunc();

    路由和服务器启动必须在注册后，否则报错， 下面代码会出错。

const Hapi = require('hapi');
const AuthBearer = require('hapi-auth-bearer-token');

const server = new Hapi.Server();
server.connection({ port: 8080 });

server.register(AuthBearer, (err) => {

    server.auth.strategy('simple', 'bearer-access-token', {
        allowQueryToken: true,              // optional, true by default
        allowMultipleHeaders: false,        // optional, false by default
        accessTokenName: 'access_token',    // optional, 'access_token' by default
        validateFunc: function (token, callback) {

            // For convenience, the request object can be accessed
            // from `this` within validateFunc.
            var request = this;  

            // Use a real strategy here,
            // comparing with a token from your database for example
            if (token === "1234") {
                return callback(null, true, { token: token }, { artifact1: 'an artifact' });
            }
            // cb(err, isValid, credentials,artifacts)
            return callback(null, false, { token: token }, { artifact1: 'an artifact' });
        }
    });

    // 这儿写路由及服务器启动...
});

server.route({
    method: 'GET',
    path: '/',
    config: { 
       auth: 'simple',
       handler: function (request, reply) {
       
          return reply('success');
       }
    }
});

server.start((err) => {

    if (err) {
      throw err;
    }
    console.log('Server started at: ' + server.info.uri);
})

======================================
无token 或 token 不对
    {
        "statusCode":401,
        "error":"Unauthorized",
        "message":"Bad token",
        "attributes":
            {"error":"Bad token"}
    }

// ------------------------------------------------
request.auth.credentials ={
    scope : ['user', 'admin'],  // 这个参数将被用在server.route里
    //...
};

server.route({
    // ...
    config: { 
       auth: {
            strategy : 'simple',    // strategies  如果是数组是这
            scope : ['+user', '!admin', 'a', 'b']      // '+' required, '!' forbidden 表示不能有admin,必须是user,且 a和b要有一个成立
                // 可以访问请求对象（query和params）上的属性，以便通过使用{}属性名称周围的字符来填充动态范围，
                // 例如'user-{params.id}'。默认为false（没有范围要求）。
       }

       handler: function (request, reply) {
       
          return reply('success');
       }
    }
});
