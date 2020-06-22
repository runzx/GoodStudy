## 内置调试控制台无输出

vscoce目前的内置调试控制台还默认不从stdout的输出流中抓取内容，需要在vsc的启动配置(launch.json)中添加配置：  

`"outputCapture": "std"`