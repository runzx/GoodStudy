### CMD

```
On Windows the environment variable is set using the set command.
set DEBUG=_,-not_this
Example:
set DEBUG=_ & node app.js
```

### PowerShell (VS Code default)

```sh
PowerShell uses different syntax to set environment variables.
$env:DEBUG = "\*,-not_this"
Example:
$env:DEBUG='app';node app.js
```

### npm script example:

```
"windowsDebug": "@powershell -Command $env:DEBUG='\*';node app.js",
```

### Git bash

`export DEBUG=debugZX`

### vscode 调试时没有显示

outputCapture-默认为 internalConsole

这对于直接写入 stdout/stderr 流而不是使用 console.\*API 的程序或日志库很有用。
`"outputCapture": "std",`

```json
"env": {
        "DEBUG": "ioredis:*"
      },
```
