# Python Launcher 是 Python for Windows 才有的功能

1. windows/py.exe
2. `py -0` 显示所有能用的版本
3. `py -3`,`py -3.10`指定相应版本
4. `where python`

## 為不同版本的 python 安裝 package

1. `py -3.5 -m pip install jupyterlab numpy pandas matplotlib`
2. `py -3.9 -m pip install jupyterlab numpy==1.19.3 pandas matplotlib`

## 配合 python venv 模組建立虛擬環境
1. `py -m venv vEnv3`
2. `py -3.9 -m venv vEnv39`