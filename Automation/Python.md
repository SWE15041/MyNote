[toc]

## install python

```
brew install python
python --version
python3 --version
```

## Python data type

str int float  复数（a + ib）= （实部+虚部j）



None: 不能参与数学运算	



String https://python.land/introduction-to-python/strings

常用字符串的函数 https://overiq.com/python-101/strings-methods-in-python/

```
>>> type("string")
<class 'str'>

# 不区分双引号和单引号
>>> s1 = ''
>>> s2 = ""
>>> s1 == s2
True
>>> print('John says "Hello there !"')
John says "Hello there !"
>>> print("I'm learning python")
I'm learning python


exp = string * n # n is int

# 字符串index
eg. hello
String           h  e  l  l  0
index            0  1  2  3  4
nagative index  -5 -4 -3 -2 -1


>>> s1 = "hello"
>>> s1[0]
'h'
>>> s1[-1]
'o'

# in && not in
>>> 'he' in 'hello'
True
>>> 'she' in 'hello'
False
>>> 'she' not in 'hello'
True


字符串操作

截取字符串
str_name[start_index:end_index]
- [start_index: unfinit] end_index > 字符串的长度，则从start_index取到字符串结束
- [start_index: ] end_index 被省略，则取start_index到字符串结束
- [:end_index] start_index 被省略，则从0开始取到end_index
- [:] 两个都被省略，取全部

>>> s1 = "hello"
>>> s2 = s1[0:7]
>>> s2
'hello'
>>> s3 = s1[1:-1]
>>> s3
'ell'

获取字符串字符个数
len(str)

字符串比较
>>> "abc"> "a"
True

注： 字符串是不可变类	
```

int  https://python.land/python-data-types/python-integer

```
int('100')
str(200)
```

bool https://python.land/introduction-to-python/python-boolean-and-operators

```
falsy value = False
bool("") 
bool(0) 
bool([])
bool(())
bool({})
bool(None)


truthy value = True
bool(0.2) 
bool(2) 
bool("boolean") 
```



```
>>> type(1)
<class 'int'>
>>> type("a")
<class 'str'>
>>> type(None)
<class 'NoneType'>
>>> 
>>> flag = False
>>> type (flag)
<class 'bool'>
>>> flag = True
>>> type(flag)
<class 'bool'>

>>> a = 22+33j
>>> print(a.real)
22.0
>>> print(a.imag)
33.0
>>> 
>>> type(a)
<class 'complex'>
```





REPL https://python.land/introduction-to-python/the-repl

**R**ead **E**valuate **P**rint **L**oop



1. Interactive Mode.
2. Script Mode.
3. 



## 变量：

1. 创建一个变量的时候，声明和赋值要同时进行的，否则程序报：”NameError: name 'a' is not defined"
2. 变量重新赋值的时候，变量类型和值都可以被覆盖
3. 变量名-命名规则：由字母、_、数字组成，不能以数字开头; 不能使用保留关键字命名； 变量名长度不限制。
4. 局部变量：函数内部定义的变量 ，函数执行完毕后被垃圾回收
5. 全局变量：函数外部定义的变量，直到程序结束被回收。

```
>>> a
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'a' is not defined
>>> a =9
>>> a
9
>>> type(a)
<class 'int'>
>>> a = "sa"
>>> a
'sa'
>>> type (a)
<class 'str'>
>>> 
```

  **保留字**

![img](https://overiq.com/media/uploads/2017/09/19/python-keywords.png)

py数据类型是强类型，不同的类型之间不会自动转化

```
>>> a=0
>>> a
0
>>> a=a+"1"
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'str'
>>> a=a+1
>>> a
1
>>> a+1
2

```



注释

```
# This is a comment on a separate line
print("Testing comments")
```



赋值

```
var1, var2, var3, ...  varN = exp1, exp2, exp3, ... expN
```

eg

```
>>> name, age, designation = "tom", 25, "Lead Developer"
>>> name
'tom'
>>> age
25
>>> designation
'Lead Developer'


>>> i, j = 10,20
>>> print (i,j)
10 20
>>> i,j=j,i
>>> print (i,j)
20 10
>>> 
```



## 关系运算符

< > <= >= != ==

## 逻辑运算符

and or not

## 算术运算符

![image-20210526180053941](file:///Users/Yanni/Library/Application%20Support/typora-user-images/image-20210526180053941.png?lastModify=1622084202)

```
>>> 
>>>  - 5 // 2 
- 3 
>>> 
>>>  - 5 / 2 
- 2.5 
>>>
```



## Function

https://overiq.com/python-101/functions-in-python/

定义

```
def function_name(arg1, arg2, arg3 ... argN):
    # function body
    <indented statement 1>
    <non-indented statement 2>
    ...
    <indented statement n>
    <return statement>
```

使用

```
function_name(arg1, arg2, arg3, ... argN)
or	
function_name()
```



注意

函数要先定义 调用，否则报错。

函数的参数：

- 基本类型值传递  数组等对象是引用传递
- 函数参数可以赋默认值：`def calc_area(length=2, width=3):...`

函数的返回值：

- 无返回值时返回值 None （NoneType），有返回值时有 return exp中 返回结果决定的。
- 返回单个值
- 返回多个值





常用函数

```
input([提示词])
type()
help(input)
id(s1) 获取对象的内存地址值

print() 默认以换行结束，可以使用end指定最后结束的方式 
- 结束符：默认"\n",可以用end属性修改
>>> print("first string", end="$") # first string$ 以$结束，而不是换行
- 分隔符：默认空格，可以用sep替换
>>> print("first", "second", "third")
first second third
>>> print("first", "second", "third", sep="\t")
first	second	third
>>> print("first", "second", "third", sep="#")
first#second#third

format()

range()
- range(a): The range(a) returns a sequence of integers from 0 to a-1.
- range(a, b): a ~ b-1
- range(a, b, c): a ~ b-c ，每次递增或递减c，c为正数 从a递增到b-c， c为负数 从a递减到b-c
-- eg.: for i in range(50, 0, -5):...
-- eg.: for i in range(10, 20):...




```



## Class



```
class our_class
    data 
    methods
    
__init__ ： 初始化或构造特殊的方法
self ：每个方法都要有这个参数，表示当前调用对象

类内部属性访问权限：
- 默认：
- private：__attributeName

```

继承

```
super(): 调用父类的构造方法
所有的类默认继承object类
object类的方法：
__new__()：用于创建对象，执行时会调用__init__()方法
__str__()：返回一个字符串，包含该类的名称及其内存地址

```

```
class Jester:
    def laugh(self):
        return print("laugh() called")

obj = Jester()
print(obj)
```



# Modules

```
import module_name
```



## 语句结构

- 语句缩进：一般是4个空格
- 

### 顺序语句

### 选择语句

```
if
if-else
if-elif-else
```

eg.

```python
if condition:
    <indented statement 1>
    <indented statement 2>

<non-indented statement>



if condition:
    # if block
    statement 1
    statement 2
    and so on
else:
    # else block
    statement 3 
    statement 4
    and so on:
    
    
if condition_1: 
    # if block
    statement
    statement   
    more statement
elif condition_2:
    # 1st elif block
    statement
    statement
    more statement
else    
    statement
    statement
    more statement

    
```



### 循环语句

```
while
for
```

while eg.

```
```

for eg.

```
sequence:
string
list
tuples
dictionary
set


for i in sequence:
    # loop body
    <indented statement 1>
    <indented statement 2>
    ... 
    <indented statement n>

```

break

```
# 终止整个for循环，结束语句循环。
for i in range(1, 10):
    if i == 5:  # when i is 5 exit the loop
        break
    print("i =", i)

print("break out")

output
i = 1
i = 2
i = 3
i = 4
break out

```



continue

```
# 中断当前循环语句，执行下一个循环
for i in range(1, 10):
    if i % 2 != 0:
        continue
    print("i =", i)
    
output
i = 2
i = 4
i = 6
i = 8

```



## 集合

### list

https://overiq.com/python-101/lists-in-python/

- empty list: []

- list function : `len() `、`sum()`   ` max()` ` min()`

- 列表元素：

  - 可以包含相同 或者 不同数据类型的元素
  - 可以包含列表元素

- index：从0开始 ，逆序读取可以用负数索引，negative index，最后一个是-1。

- list 是可变类型：变更元素 ，list 对象的内存地址不变。

- list[start:end]：

  -  截取list ，取索引从start开始 ，到end-1的元素
  - [:end] : 从0到end-1
  - [start:] : 从start到最后一个元素
  - [:] : 所有的元素

- sequence * n 

- 关系比较：跟字符串比较一样

- 特点：有序

- 

  

```
variable = [item1, item2, item3, ..., itemN]
[ expression for item in iterable ]
[ expression for item in iterable if condition ]

```

```
>>> type([])
<class 'list'>

# sequence * n
>>> list1 = [1,2]
>>> list2= list1 * 2
>>> list2
[1, 2, 1, 2]
>>> 

# extend
>>> list3 = ["a","b"]
>>> list3.extend("aaa")
>>> list3
['a', 'b', 'a', 'a', 'a']
```

![image-20210527161015128](/Users/Yanni/Library/Application Support/typora-user-images/image-20210527161015128.png)

### Tuples

- 不可变类，一旦创建，修改会分配新的内存地址给tuple变量
- 操作： + 、*、in、not in 、max、min、sum
- 获取元组内元素：varName[index]

```
>>> t= ()
>>> type(t)
<class 'tuple'>
>>> type(())
<class 'tuple'>
>>> 
```



### Sets

- 可变类型
- 特点：集合内元素唯一，无序

```python
a_set = { item1, item2, item3 ..., itemN }

max() 
min() 
sum()
remove()
discard()
update()
clear()
in
not in
issuperset()
issubset() A.issubset(B)
union() 并集
| 并集
intersection() 交集
& 交集 
- 差集
^ 补集

```

### Dictionary

```python
variable_name = {
    'key1' : 'value1',
    'key1' : 'value1',
    ...
    'keyN' : 'valueN',
}


del dict_name[key]
len(variable_name)
in
not in

```





## 异常

### 异常捕获

```python
try:
    # try block
    # write code that might raise an exception here
    <statement_1>
    <statement_2>
except ExceptiomType:
    # except block
    # handle exception here
    <handler>
    
    
try:    
    <statement_1>
    <statement_2>
except <ExceptiomType1>:    
    <handler>
except <ExceptiomType2>:    
    <handler>
else:
    # else block only gets executed
    # when no exception is raised in the try block
    <statement>
    <statement>
    
    
    
try:
    # try block
    # write code that might raise an exception here
    <statement_1>
    <statement_2>
except <ExceptiomType1>:
    # except block
    # handle ExceptiomType1 here
    <handler>
except <ExceptiomType2>:
    # except block
    # handle ExceptiomType2 here
    <handler>
except <ExceptiomType2>:
    # except block
    # handle ExceptiomType3 here
    <handler>
except:
    # handle any type of exception here
    <handler>
    
    
try:    
    <statement_1>
    <statement_2>
except <ExceptiomType1>:    
    <handler>
except <ExceptiomType2>:    
    <handler>
finally:
    # statements here will always
    # execute no matter what
    <statement>
    <statement>	
    
except ExceptionType as e

```

![img](https://overiq.com/media/uploads/2017/09/28/exception-class-hierarchy.png)

### 异常抛出

```python
raise SomeExceptionClas("Error message describing cause of the error")
```

### 自定义异常

```python
class InvalidFactorialArgumentException(Exception):
    def __init__(self, message):
        super().__init__()
        self.message = message

    def __str__(self):
        return self.message
```

