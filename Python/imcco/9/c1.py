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
    name='zhax'     #类变量，name,age在这定义不好
    age=0
    #一个班级的学生人数总合
    sum = 0

    #
    def __init__(self,name,age):
        #构造函数
        #初始化对象
        #self.xx 实例变量（python独特处！） self可以用别的字符串如：this,that,...
        self.name = name    
        self.age = age
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

#实例变量
print(student1.name)
#类变量
print(Student.name)
# print(id(student1))
# print(id(student2))
