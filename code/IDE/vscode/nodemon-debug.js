launch = {
  type: 'node',
  request: 'launch',
  name: 'nodemon',
  runtimeExecutable: 'nodemon',
  runtimeArgs: ['-i', ' ./lowDB/'], // 这儿不能 "-i ./lowDB/" ！
  program: '${workspaceFolder}/index.js',
  restart: true, // ！！
  console: 'integratedTerminal',
  internalConsoleOptions: 'neverOpen'
}
// nodemon -i ./dir/ 忽略此文件或目录下变化！
// 调试 npm
l = {
  type: 'node',
  request: 'launch',
  name: 'npm',
  restart: true,
  runtimeExecutable: 'npm',
  runtimeArgs: ['run-script', 'debug'], // 后面对应 script里的
  port: 9229
}
package = {
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
    debug: 'nodemon -i ./lowDB/ --inspect'
  }
}
// 这方式在 nodemon 上重启后就找不到服务了！！
