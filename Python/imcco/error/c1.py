'''错误处理流程
'''

try:
    s = [1,2,3]
    # print(s[3])     
    # 用于触发IndexError
    raise Exception('自己抛出一个错误，这是自定义错误信息。') 
    # 当抛出一个异常时，必须有一个except与之对应，否则最终抛给python
except EOFError: # 当到达一个文件的末尾时引起
    print('EOF')
except IndexError: # 超出序列的范围
    print('Not INDEX')
except Exception(e) ：#as e:
    # print(e)
    print(e)
else: 
    # 还可以让try..catch块关联上一个else从句。当没有异常发生的时候，else从句将被执行
    print('没有任何异常')
finally:
    # 无论异常发生与否的情况下都会执行的语句
    print('ok')
ValueError()
