# dictionary

# students = ["Ahmed", "Mohammed", "Khalid", "Sarah", "Rachid"]
# grades = [85, 92, 78, 90, 88]

# gradeBook = dict(zip(students,grades))
# print(gradeBook)

# Strings


#############################################
# text = """learning python is fun. it is a versatile language.
# many developers use it for web development, data science, and automation."""

# sentences = text.split(".")
# # print(sentences)
# sentences.pop(-1)
# # print(sentences)
# print()

# li1 = [s1.strip().capitalize().replace('python', 'Python').replace('developers', 'programmers') for s1 in sentences]

# for s in li1 :
#     print(s)

# print()

#############################################

numbers = [10, 21, 32, 43, 54, 65, 76, 87, 98]
print(numbers)
doubled = [num*2 for num in numbers]
print(doubled)

is_even = [num%2 == 0 for num in numbers]
print(is_even)

mod_result = [num%5 for num in numbers]
print(mod_result)