[toc]

#  泛型

## 一、泛型的概念

**泛型的定义**：

1. Java 的泛型是在jdk1.5引入的概念，提供了编译时类型安全监测机制
2. 泛型的本质就是参数化类型，

**泛型的作用**

1. 消除强制类型转换的问题
2. 类型安全

**泛型类**



## 二、泛型的使用

### 泛型类

1. 语法：

   ```java
   class 类名称<泛型标识,泛型标识,....>{
    private 泛型标识 变量名；
   }
   ```

   

2. 常用的泛型标识：

   - T :
   - K
   - E 
   - V
   - 

3. 使用

   ```
   类名<具体数据类型> 对象名=new 类名<>();
   ```

   

4. 特点：
   - 泛型类如果没有指定数据类型，默认是是Object类型；
   - 泛型类的类型参数只能是类类型，不支持基本数据类型
   - 同一泛型类创建的对象，数据类型相同，都是泛型类

#### 泛型类的派生子类

1. 如果子类是泛型类，子类的泛型标志要和父类一致；
2.  如果子类不是泛型类，子类需要指定父类泛型的数据类型



#### 泛型类和静态变量、静态方法

1. 泛型类中的静态方法和静态变量不可以使用泛型类所声明的泛型类型参数

- 注：泛型方法可以是静态方法（泛型方法和泛型类不一样）

### 泛型接口

1. 实现类不是泛型类，接口要明确数据类型
2. 实现类是泛型类，实现类和接口的泛型类型保持一致 



### 泛型方法

**泛型方法的定义**

1. 语法

   ```
   修饰符 <T,E,....> 返回值类型 方法名（参数列表）{
     方法体... 
   }
   ```

   

2. 特点

   - 泛型方法可以声明为static，泛型类的成员方法不能被static修饰；
   - 参数列表支持可变参数类型

3. 例子

   ```java
   public class GenericMethod {
   
       public <E> E get(List<E> list) {
           return list.get(new Random().nextInt(list.size()));
       }
   
       public static void main(String[] args) {
           GenericMethod genericMethod = new GenericMethod();
           List<Integer> list = Arrays.asList(1, 2, 23, 4, 4, 5);
           Integer integer = genericMethod.get(list);
           System.out.println(integer);
   
       }
   }
   ```

   

 **类型通配符**

- ? ：类型通配符，表示类型实参，例：Box<?> box
- 类/接口<? extends 实参类型>：类型通配符的上限；例：Box<? extends Number> box
- 类/接口<? super 实参类型>：类型通配符的下限；例：



### 类型擦除

1. 泛型只存在于编译阶段，

2. 擦除方式

   - 无限制类型擦除 ：object

   - 有限制类型擦除：

   - 擦除方法中参数的类型定义：

     ![image-20200405020957681](/Users/lyn/Library/Application Support/typora-user-images/image-20200405020957681.png)

   - 桥接方法：接口例子

     ![image-20200405021152007](/Users/lyn/Library/Application Support/typora-user-images/image-20200405021152007.png)

    - 

### 泛型数组

1. 定义：可以声明泛型数组，不能直接创建泛型数组；错误示范：` T[] array = new T[5];`

2. 创建泛型数组：

   - 方式1

     ```java
     List<String>[] lists = new ArrayList[5];
     ```

     

   - 方式2

   ```java
   class Fruit<T> {
       private T[] array;
   
       public Fruit(Class<T> clazz, int length) {
           array = ((T[]) Array.newInstance(clazz, length));
       }
   }
   ```

   



###  泛型与反射

定义：泛型存在类型擦除，不能直接被实例化。

1. Class<T>
2. Constructor<T>



### 泛型与异常

1. 不能再catch子句中使用泛型变量

2. 为什么不能扩展Throwable，因为异常都是在运行时捕获和抛出的，而在编译的时候，泛型信息全都会被擦除掉

   

# 异常

​	

