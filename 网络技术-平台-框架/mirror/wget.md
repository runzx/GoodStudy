# wget 递归镜像网站

`wget -r -p -np -k http://xxx.com/xxx`

-r, –recursive（递归） specify recursive download.（指定递归下载）  
-k, –convert-links（转换链接） make links in downloaded HTML point to local files.（将下载的 HTML 页面中的链接转换为相对链接即本地链接）  
-p, –page-requisites（页面必需元素） get all images, etc. needed to display HTML page.（下载所有的图片等页面显示所需的内容）  
-np, –no-parent（不追溯至父级） don’t ascend to the parent directory.  

另外断点续传用-nc 参数 日志 用-o 参数


-E  或 --html-extension   将保存的URL的文件后缀名设定为“.html”
-c 断点续传
-t 0 反复尝试的次数，0为不限次数
-O rhel6_x86_64.iso 把下载的文件命名为rhel6_x86_64.iso

--user-agent="Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092416 Firefox/3.0.3"   

--spider 测试下载链接  
--tries=1000  尝试次数  
将多个下载链接写入到一个download-file-list.txt文件中   
wget -i download-file-list.txt 一起下载  

wget --mirror -p --convert-links -P ./LOCAL-DIR WEBSITE-URL

参数讲解：
--mirror：设置这个参数用来建立本地镜像
-p：下载所有html文件适合显示的元素
--convert-links：下载完成后，将文档链接都转换成本地的
-P ./LOCAL-DIR：保存所有的文件和目录到指定文件夹下

-A .pdf   仅下载指定类型的文件
# 
wget -r -p -np -k -E -c https://developer.mozilla.org/zh-CN/docs/Web/JavaScript -P ./js

// 上面会把 JavaScript目录的同级目录如API/ CSS/...一起下载
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide  这地址就只会下 JavaScript/下面的

wget --mirror -np -k https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide  -P ./js2    // -p 会下载 /static/下面的