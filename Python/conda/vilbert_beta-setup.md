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
2. 安装 pytorch 是一个针对深度学习, 并且使用 GPU 和 CPU 来优化的 tensor library (张量库)  
`conda install pytorch torchvision cudatoolkit=10.0 -c pytorch`

    要用国内源：  
`conda install pytorch torchvision cudatoolkit=10.0`

3. 安装 NVIDIA维护的实用程序 apex   https://github.com/NVIDIA/apex  
Python 3  
CUDA 9或更高版本  

        `https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&target_distro=Ubuntu&target_version=1804&target_type=runfilelocal`  

    PyTorch 0.4或更高版本。CUDA和C ++扩展需要pytorch 1.0或更高版本。  

    `git clone https://github.com/NVIDIA/apex`  
    `cd apex`  
            为了获得性能和完整功能，我们建议通过以下方式安装带有CUDA和C ++扩展名的Apex：  
    `pip install -v --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" ./`