'''
类=面向对象
类、对象
实例化
类的基本作用：封装
类的方法只能在类外面执行
方法： 设计层面
函数： 运行，过程
'''

class Student():
    name=''
    age=0

    #
    def __init__(self,name,age):
        #构造函数
        #初始化对象
        name = name
        age = age
        print('student name: '+ name + ',  age: '+str(age))
        pass
    #行为
    def do_homework(self ):
        print('homework')

'''
class Printer():

    #打印档案主体不应是学生对象
    
    #行为 与 特征
    def print_file(self, parameter_list):
        raise NotImplementedError
'''

student1 = Student('zhaixiang',20)
student2 = Student('mm',7)

# print(id(student1))
# print(id(student2))
