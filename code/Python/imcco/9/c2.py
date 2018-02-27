'''
继承
开闭原则
'''
from c14 import Human

class Student(Human):
    
    def __init__(self,school,name,age):
        self.school = school
        #调用父类的构造函数 要传入self !
        # Human.__init__(self,name,age)
        super(Student,self).__init__(name,age)

    def do_homework(self):
        super(Student,self).do_homework()
        print('english homework')

student1 = Student('中心小学','zx',18)
print(student1.sum)
student1.get_name()
student1.do_homework()
# print(student1.name)
