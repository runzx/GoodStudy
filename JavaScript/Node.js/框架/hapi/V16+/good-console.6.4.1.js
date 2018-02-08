/**
 * https://github.com/hapijs/good-console/blob/v6.4.1/README.md
 */

new GoodConsole([config])
// Creates a new GoodConsole object with the following arguments:
    {
        module: 'good-console',
        args: [
            {
                format: 'YYMMDD/HHmm',  // Defaults 'YYMMDD/HHmmss.SSS'
                utc: false,             // 此时用系统时间,默认 true
                color: false
            }
        ]
    },
'stdout'    // 控制台输出

        输出：
    "ops" - 160318/013330.957, [ops] memory: 29Mb, uptime (seconds): 6, load: [1.650390625,1.6162109375,1.65234375]
    "error" - 160318/013330.957, [error,event.tags] message: Just a simple error, stack: event.error.stack
    "request" - 160318/013330.957, [request,event.tags] data: you made a request
    "log" - 160318/013330.957, [log,event.tags] data: you made a default
    "response" - 160318/013330.957, [response, event.tags] http://localhost:61253: post /data {"name":"adam"} 200 (150ms)