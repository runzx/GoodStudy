插件 路由前缀
  可以为插件内所有路由设定 前缀
    下面是插件注册几种传options 方式与不同
        给插件用的options
        注册时执行用的options
await server.register([
    {
        plugin: MyLoggingPlugin,
        options: { logErrors: true }    // Plugin options for MyLoggingPlugin
    },
    FrontendPlugin,                     // No plugin or registration options specific to FrontendPlugin
    {
        plugin: BackendPlugin,
        options: {                      // Plugin options for BackendPlugin
            database: {
                connection: 'mysql://username@password:localhost'
            }
        },
        routes: {                       // Registration options for BackendPlugin
            prefix: '/api'
        }
    }
], {
    routes: {                           // Registration options for all plugins above
        vhost: 'mysite.com'
    }
});