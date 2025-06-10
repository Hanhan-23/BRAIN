class Person:
    def __init__(self, name, age):
        self.name = name,
        self.age = age,

    def show(self , name, age):
        print(name, age)

person1 = Person('cek', 23)
print(person1)
person1.show('cek', 23)