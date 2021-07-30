[toc]

# Java

Java变更记录：https://docs.oracle.com/en/java/javase/16/language/java-language-changes.html#GUID-6459681C-6881-45D8-B0DB-395D1BD6DB9B

## Exception

什么是异常？

异常是在程序执行期间发生的破坏正常指令流的事件。



异常分类？

1. checked exception：除了由表示`Error`，`RuntimeException`和它们的子类以外的异常，应用程序可以捕获**预期的异常**并从中恢复的特殊情况
2. error：应用程序外部的特殊情况，通常无法预测或从中恢复
3. runtime exception： 应用程序内部的异常情况，应用程序通常无法预测或从中恢复

![Throwable 类及其最重要的子类。](https://docs.oracle.com/javase/tutorial/figures/essential/exceptions-throwable.gif)



语法糖`try-with-resources`的使用？

1. Jdk 7引入的语法糖，使得关闭资源操作无需层层嵌套在finally。

2. 被屏蔽的异常：-with-resources 语句最多可以抛出两个异常；如果try语句块和with-resources都抛出异常，则with-resources内的异常被抑制，可以通过`Throwable.getSuppressed`从`try`块抛出的异常中调用方法来检索这些被屏蔽的异常。

   （从Java 1.7开始， Throwable 类新增了 addSuppressed 方法，支持将一个异常附加到另一个异常身上，从而避免异常屏蔽。）

3. 处理必须关闭的资源时，始终要优先考虑使用try-with-resources，而不是try-finally。
4. resource指的是继承了java.lang.AutoCloseable 或者java.io.Closeable类的对象。
5. 在 try-with-resources 语句中，任何 catch 或 finally 块都在声明的资源关闭后运行。
6. 多个resource时，程序会按照resource声明的顺序去关闭资源。

**题外话**： 当finally有return时，会直接返回。不会再去返回try或者catch中的返回值，而finally没有return时，try和catch 的return语句并不会马上执行，而是执行完finally代码块之后再返回try和catch里面的值。



# Java9

`var`标识符 

- 作用：声明非空的局部变量
- 优点：消除冗余信息使代码更具可读性
- 缺点：删除有用信息使代码可读性降低。

```
原则
P1。读代码比写代码更重要。
P2。代码应该从本地推理中清晰可见。
P3。代码可读性不应依赖于 IDE。
P4。显式类型是一种权衡。

```



# Java8 

https://docs.oracle.com/javase/8/docs/index.html

![image-20210608173707596](/Users/Yanni/Library/Application Support/typora-user-images/image-20210608173707596.png)

​	
