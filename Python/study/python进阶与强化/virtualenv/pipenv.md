## pipenv

1. setup: pip install pipenv
   pipenv-2020.11.15 six-1.15.0 virtualenv-20.4.3 virtualenv-clone-0.5.4 // 自动安装 virtualenv
2. 创建 env: pipenv install // 在项目目录下运行
   pip list // 查看

3. activevirtualenv: pipenv shell
4. 安装包，不用 pip, 用 pipenv instsll xxx
5. 命令
   exit // 退出虚拟环境  
   pipenv uninstall flask // 卸载包
   pipenv graph // 查看包依赖关系

6. vscode 配置
   pipenv --venv // 查到 当前虚拟环境的位置  
   Ctrl+Shift+P，输入 settings，选择 Open Settings(JSon)  
   “python.venvPath”: C:\\Users\\zhaixiang\\.virtualenvs”

   可以在 vscode 左下角状态栏点击 python，切换

7. 源
   "https://pypi.tuna.tsinghua.edu.cn/simple/"  
   http://mirrors.aliyun.com/pypi/simple/
   https://mirrors.163.com/pypi/simple/  
   https://mirrors.cloud.tencent.com/pypi/simple  
   https://mirrors.cloud.tencent.com/pypi/simple/
