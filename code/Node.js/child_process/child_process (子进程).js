
// 1. 默认情况下，在 Node.js 的父进程与衍生的子进程之间会建立 stdin、stdout 和 stderr 的管道。
    
    const { spawn } = require('child_process');
    const ls = spawn('ls', ['-lh', '/usr']);

    ls.stdout.on('data', (data) => {
        console.log(`输出：${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`错误：${data}`);
    });

    ls.on('close', (code) => {
        console.log(`子进程退出码：${code}`);
    });

    // child_process.spawn() 方法会异步地衍生子进程，且不会阻塞 Node.js 事件循环。 
    // child_process.spawnSync() 方法则以同步的方式提供同样的功能，但会阻塞事件循环，直到衍生的子进程退出或终止。

    child_process.spawn(command[, args][, options])
        command <string>    要运行的命令。
        args    <Array>     字符串参数列表。
        options <Object>
            cwd <string>    子进程的当前工作目录。
            env <Object>    环境变量键值对。
            argv0 <string>  显式地设置要发给子进程的 argv[0] 的值。 如果未指定，则设为 command。
            stdio <Array> | <string> 子进程的 stdio 配置。 （详见 options.stdio）
            detached <boolean> 准备将子进程独立于父进程运行。 具体行为取决于平台。（详见 options.detached）
            uid <number>    设置该进程的用户标识。（详见 setuid(2)）
            gid <number>    设置该进程的组标识。（详见 setgid(2)）
            shell <boolean> | <string> 如果为 true，则在一个 shell 中运行 command。 在 UNIX 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 一个不同的 shell 可以被指定为字符串。 See Shell Requirements and Default Windows Shell. 默认为 false（没有 shell）。
            windowsVerbatimArguments <boolean> No quoting or escaping of arguments is done on Windows. Ignored on Unix. This is set to true automatically when shell is specified. Default: false.
            windowsHide <boolean> Hide the subprocess console window that would normally be created on Windows systems. Default: false.
        返回: <ChildProcess>