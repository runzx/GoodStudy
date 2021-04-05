## py v3 版本区别

### v3.8

1. 赋值表达式: 赋值也有返回值的
   `a = (b := 1)`

2. 只按位置传递的参数

```python
def headlin(text, /, border="~", *, width=50):
    return f" {text} ".center(width, border)
```

3. 更精确的类型提示: typing 模块添加类型提示

```python
# Python 3.7 就开始支持 Type Hints, 对变量，函数参数或函数返回值进行类型提示. (调是实际类型可以是任意的)
count: int = 20
def foo(number: float) -> float:
    pass

# Python 3.8 加入的一些 Literal type 类型提示，同样它也不是语法强制

from typing import Literal   # Literal 像是枚举类型的提示

def get_status(port: int) -> Literal['connected', 'disconnected']:
    return 'connected'   # 提示该函数只返回 'connected' 或 'disconnected'

def draw_line(direction: Literal['horizontal', 'vertical']) -> None:
    pass      # 函数应传入 'horizontal' 或 'vertical'

# Literal 是限定值的选择，此外还有 Union 类型的提示 -- 可接受类型的枚举
from typing import Union

def foo(number: Union[float, int]) -> Union[str, int]:
    pass
# 还有 Final 或 @final 装饰，相当于 Java 的 final 关键字，变量不能重赋值，类不能被继承，方法不能被覆盖
from typing import Final
ID: Final = 1
ID += 1   # 用 mypy 静态检查时会报错: Cannot assign to final name "ID"
from typing import final

@final
class Base:
    pass

class Sub(Base):   # 如果用 mypy test.py 检查，错误为 error: Cannot inherit from final class "Base"
    pass

# TypeDict: 像是 NamedTuple
from typing import TypedDict    //不作具体介绍

# Protocol:  Duck Typing, 实例含有的特定方法比类型更重要， Protocol 像是一个标识接口
from typing import Protocol     //也不作具体介绍，好像没多大意义
```

4. 新模块 importlib.metadata: 可以探查安装了什么包
   提供了 SharedMemory 类，可以在不同的 Python 进城之间创建共享的内存区域
5. Math 和 Statistics 函数 (NumPy 可能会是更好的选择)
6. 用 f-strings 进行简单的调试
7. 可反转字典 reversed()

### V3.9

1. ast
2. asyncio
3. threading
4. pprint
5. 合并操作符号 update 方法 字符串的新函数
