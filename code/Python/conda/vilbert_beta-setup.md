## vilbert_beta setup
1. 新建 conda 环境, 安装所有的依赖包.

    `conda create -n vilbert python=3.6`    // 安装一个vilbert 环境，pyv3.6  
    `conda activate vilbert`  // 激活此vilbert环境  
    `git clone https://github.com/jiasenlu/vilbert_beta`  // 克隆vilbert_beta 包  
    `sudo apt-get install build-essential libcap-dev` 先安装依赖包 Debian and Ubuntu  
    
        `sudo yum install gcc glibc-devel libcap-devel` Fedora and other RPM-based   
    `cd vilbert_beta`  
    `pip install -r requirements.txt`  // 安装 vilbert_beta包的py依赖包   
    因为ali镜像是http, 要加 `pip install -r requirements.txt --trusted-host mirrors.aliyun.com`
2. 

