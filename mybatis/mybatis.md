[toc]

# mybatis

## 零、链接

原文链接：https://blog.csdn.net/hellozpc/article/details/80878563

动态sql语法参考：https://www.cnblogs.com/homejim/p/9909657.html



## 一、使用步骤

1)配置mybatis-config.xml 全局的配置文件 (1、数据源，2、外部的mapper)
2)创建SqlSessionFactory
3)通过SqlSessionFactory创建SqlSession对象
4)通过SqlSession操作数据库 CRUD
5)调用session.commit()提交事务
6)调用session.close()关闭会话









## 二、注意

### 1. #{}和${}的区别
```
注意：
#{} 只是替换？，相当于PreparedStatement使用占位符去替换参数，可以防止sql注入。
${} 是进行字符串拼接，相当于sql语句中的Statement，使用字符串去拼接sql；$可以是sql中的任一部分传入到Statement中，不能防止sql注入。

使用${} 去取出参数值信息，需要使用${value}
#{} 只是表示占位，与参数的名字无关，如果只有一个参数，会自动对应。

```



### 2. resultType和resultMap

返回类型可以用resultType，也可以用resultMap，resultType是直接
表示返回类型的，而resultMap则是对外部ResultMap的引用。



### 3. Mybatis-config.xml配置标签

```

```

