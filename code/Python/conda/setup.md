## setup
1. download:  https://www.anaconda.com/distribution/

2. ./Anaconda3-2020.02-Linux-x86_64.sh    
// 先 chmod +x Anaconda3-2020.02-Linux-x86_64.sh

3. test
`conda -V`
`conda list`
`conda -h`

4. 换国内源方法
~/.condarc
```
channels:
  - https://mirrors.sjtug.sjtu.edu.cn/anaconda/pkgs/main/
  - https://mirrors.sjtug.sjtu.edu.cn/anaconda/pkgs/free/
  - https://mirrors.sjtug.sjtu.edu.cn/anaconda/cloud/conda-forge/
ssl_verify: true
```
上海交大的要快，但它有些文件没有？？所以把清华放下面
```
channels:
  - https://mirrors.sjtug.sjtu.edu.cn/anaconda/pkgs/main/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
  - https://mirrors.sjtug.sjtu.edu.cn/anaconda/pkgs/free/
  - https://mirrors.sjtug.sjtu.edu.cn/anaconda/cloud/conda-forge/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
ssl_verify: true
show_channel_urls: true
```

~/.pip/pip.conf
```
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/ 
```