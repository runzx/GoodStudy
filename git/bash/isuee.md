1. stdout is not a tty  
为了交互正常， `alias vue='winpty vue.cmd'`  
`vue inspect > output.js` 报错，只有空文件output.js  
解决方法：  
`vue.cmd inspect > output.js`  