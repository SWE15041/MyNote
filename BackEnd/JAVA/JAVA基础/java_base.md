[toc]

# 泛型

泛型类

泛型接口

泛型方法

泛型数组

不能再catch子句中使用泛型变量

```java
<?> 无限制通配符
<? extends E> extends 关键字声明了类型的上界，表示参数化的类型可能是所指定的类型，或者是此类型的子类
<? super E> super 关键字声明了类型的下界，表示参数化的类型可能是指定的类型，或者是此类型的父类
```

类型擦除	



静态方法和静态变量不可以使用泛型类所声明的泛型类型参数

```java
public class Test2<T> {    
    public static T one;   //编译错误    
    public static  T show(T one){ //编译错误    
        return null;    
    }    
}
```



# JAVA面向对象的三大特性

## 封装



## 继承



## 多态

Java 实现多态有三个必要条件：继承、重写、向上转型。

继承：在多态中必须存在有继承关系的子类和父类。

重写：子类对父类中某些方法进行重新定义，在调用这些方法时就会调用子类的方法。

向上转型：在多态中需要将子类的引用赋给父类对象，只有这样该引用才能够具备技能调用父类的方法和子类的方法。

只有满足了上述三个条件，我们才能够在同一个继承结构中使用统一的逻辑实现代码处理不同的对象，从而达到执行不同的行为。

对于 Java 而言，它多态的实现机制遵循一个原则：当超类对象引用变量引用子类对象时，被引用对象的类型 而不是 引用变量的类型 决定了调用谁的成员方法（被引用对象的类型 决定调子类还是父类的成员方法），但是这个被调用的方法必须是在超类中定义过的，也就是说被子类覆盖的方法。

# 关键字

## transient

