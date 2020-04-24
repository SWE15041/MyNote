
[toc]
# lambda

## 一、基础
### 1. Lambda 表达式基础语法：
lambda表达式的操作符：->
操作符的左侧：lambda表达式的参数列表
操作符的右侧：lambda表达式中需要执行的功能


### 2. 语法
- 语法格式一：无参数 无返回值

```java
         Runnable runnable = new Runnable() {
                   @Override
                   public void run() {
                       System.out.println("hello~");
                   }
               };
               runnable.run();
               System.out.println("-----------------------------------");
               Runnable runnable1 = () -> System.out.println("hello~");
               runnable1.run();
​```

- 语法格式二： 有一个参数 无返回值；（只有一个参数时，可以省略参数的括号）
​```java
        Consumer<String> consumer = (x) -> System.out.println(x);
        consumer.accept("语法格式一：只有有一个参数 无返回值");
        Consumer<String> consumer2 = x -> System.out.println(x);
        consumer2.accept("语法格式一：只有一个参数(可省略参数的括号) 无返回值");
​```

- 语法格式三： 有两个以上的参数，有返回值
      - 只有一个语句体可以省略大括号和return
      - 语句体有多个语句的时候需要用大括号包含起来
​```java
     Comparator<Integer> comparator = (o1, o2) ->Integer.compare(o1,o2);
​```   
  
- 语法格式四：参数列表可以省略参数的数据类型，JVM会根据上下文进行类型推断

3. lambda表达式需要"函数式接口"的支持
- 函数式接口定义：接口中只有一个抽象方法的接口，成为函数式接口；
- @FunctionalInterface 注解用来修饰函数式接口；



## JAVA8内置四大函数式接口
### 1. 消费型接口：Consumer<T>
```java
@FunctionalInterface
public interface Consumer<T> {

    /**
     * Performs this operation on the given argument.
     *
     * @param t the input argument
     */
    void accept(T t);
}
​```
### 2.供给型接口:Supplier<T>
```java
@FunctionalInterface
public interface Supplier<T> {

    /**
     * Gets a result.
     *
     * @return a result
     */
    T get();
}

```
### 3.函数型接口: Function<T, R> 
```java
@FunctionalInterface
public interface Function<T, R> {

    /**
     * Applies this function to the given argument.
     *
     * @param t the function argument
     * @return the function result
     */
    R apply(T t);
}
​```

### 4. 断言型接口： Predicate<T> 
```java
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T var1);
    }
​```
## 方法引用
### 1.方法引用
定义：如果lambda体中的内容有方法已经实现了，我们可以使用"方法引用"
引用方式：
    - 对象::实例方法名
    - 类::静态方法名
    - 类::示例方法名

### 2.引用方式
注：lambda体中调用方法的参数列表和返回值类型，要与函数式接口中抽象方法的参数列表和返回值类型相同
- 对象::实例方法
​```java
//        Consumer<String> consumer1 = (x) -> out.println(x);
        PrintStream out = System.out;
        Consumer<String> consumer = out::println;
        consumer.accept("对象::实例方法");
        

```
​```java
//        Supplier<String> supplier1 = () -> employee.getName();
        Employee employee = new Employee("张三", 11, 2000.0);
        Supplier<String> supplier = employee::getName;
        String name = supplier.get();
        System.out.println(name);
​```
- 类::静态方法名
​```java
//        Comparator<Integer> comparator1 = (x, y) -> Integer.compare(x, y);
        Comparator<Integer> comparator = Integer::compare;
        int compare = comparator.compare(1, 2);
        System.out.println(compare);
​```
- 类::实例方法名
注：第一个参数是实例方法的调用者，第二个参数是实例方法的参数；
​```java
//BiPredicate<String, String> biPredicate1 = (x, y) -> x.equals(y);
        BiPredicate<String, String> biPredicate = String::equals;
        boolean test = biPredicate.test("1", "1");
        System.out.println(test);
​```

## 构造器引用
### 1. 格式：类名::new
注：需要调用的构造器的参数列表 要与函数式接口中抽象方法的参数列表保持一致
​```java
//Supplier<Employee> supplier1 = () -> new Employee();
        Supplier<Employee> supplier=Employee::new;
        Employee employee = supplier.get();
        System.out.println(employee);
​```
​```java
// Function<Integer, Employee> function1 = (x) -> new Employee(x);
        Function<Integer, Employee> function = Employee::new;
        Employee apply = function.apply(11);
        System.out.println(apply);
​```
## 数组引用
### 1.语法格式： Type[]::new 
```java
Function<Integer, String[]> function1 = (x) -> new String[x];
        Function<Integer, String[]> function= String[]::new;
        String[] strs = function.apply(101);
        System.out.println(strs.length);
​```






## 问题
### 1. 接口中default 和静态代码块，例如：Comparator类
