'''
继承
'''
from c14 import Human

class Student(Human):
    
    def __init__(self,school,name,age):
        self.school = school
        Human.__init__(self,name,age)

student1 = Student('中心小学','zx',18)
print(student1.sum)
student1.get_name()
# print(student1.name)
