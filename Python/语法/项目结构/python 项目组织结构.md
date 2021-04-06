# python 项目组织结构

1.  包 模块 类 函数/变量  
    目录 文件
2.  命名空间  
    包名.模块名 : 目录名.文件名 #文件名不用带.py  
    包.子包  
    包： 目录下有特定文件：`__init__.py`

3.  引用模块  
    import 模块名  
    简写： import 包.模块名 as 别名  
    模块下变量： 模块名.变量  
    简写： 别名.变量

```python
from module import a,b
# 导入变量， 可直接使用 a,b
# 用 * 可以导入全部变量

__ALL__ = ['a','b']
# 模块中  来指定 import * 引入的变量

from 包 import 模块名
```

4.  vscode 显示隐藏  
    "files.exclude"
5.  一次导入多个模块

```python
from module import a,b \
  c
# 多时可用 行尾加'\'换行

from module import (a,b,
c)
# 也可以用(a,b,c,...)换行，
```

6.  `__init__.py` 被导入时自动执行(只一次)！  
    可以把包和模块的初始化放这里面。

    import 模块， 其它的不用再次批量导入相应模块， 只用 import 包

7.  包和模块不会被重复导入！  
    要避免循环导入  
    导入模块时会执行模块的代码。

8.  模块内置变量

```python
dir()       # 返回当前模块里有哪些变量
__name__    # 包.模块名
            # 入口文件的为 '__main__'
__package__ # 包名 入口文件的包名为 空
__doc__     # 注解，在模块最前面，用
'''包起
注解 内容
'''
__file__    # 完全路径，物理路径
            # 入口文件的为 当前文件(相对路径！)
# 如果当前文件包含在sys.path里面，__file__ 返回 相对路径！ ???

# 如果当前文件不包含在sys.path里面 __file__ 返回 绝对路径
```

9.  `__name__` 经典应用

```python
dir(模块名)

# 可作模块，出可作可执行入口文件，下面是判断
if __name__ == '__main__':
  pass


```

10. `python -m package.xx` #把普通文件当作模块来执行
11. 相对导入 绝对导入  
    绝对导入 要从顶级包开始  
    入口文件不能用相应路径来导入，  
    用 from
    . 当前， ..上一级， ...上上级  
    python3 新增加的包命名空间，没有`__init__.py` 也可以导入  
    确保顶级目录中没有`__init__.py` 来作为共同的命名空间。  
    package1/spam/xx1.py  
    package2/spam/xx2.py #任何一个目录里都没有`__init__.py` 文件。

```python
import sys
sys.path.extend(['package1','package2'])
import spam.xx1
import spam.xx2     #2个不同包目录被合并。

# 一个包是否被作为一个包命名空间，
# 检查__file__,没有则是个命名空间。
```
