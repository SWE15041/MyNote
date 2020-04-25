[toc]

# 简介

## 一、与maven比较

从ant中借用了绝大多数构建任务，主要是依赖管理和项目发布

## 二、与Ant比较

软件编译、测试、部署等步骤联系在一起 加以自动化的一个工具，大多用于Java环境中的软件开发。

# gradle

定义：

> 基于groovy语言（DSL）构建脚本，不再像maven一样使用XML



一、gradle和idea的集成



gradle的安装

环境变量

GRADLE_HOME

GREDLE_USER_HOME



父工程和子工程gradle的关系

## 构建gradle项目

概要

>- 可以通过idea构建普通Java工程或者是web工程
>- gradle两个核心概念：project、Task
>- project由一个或者多个task组成，每个task表示在构建执行过程中的一个原子操作，如：编译、打包、生成javadoc、发布到仓库
>- project可以是一个jar或war文件

project常用配置

>- plugins , apply plugin ：引入插件
>- Dependencies 依赖配置
>- repositories 仓库配置
>- task ：任务书写
>- ext、 gradle.properties Project 中属性配置

task

> - dependsOn : 依赖相关操作
> - doFirst ：任务执行之前执行的方法
> - doLast：任务执行之后执行的方法

```groovy
task t1{
    printlln "t1"
}

task t2(dependsOn : "t1"){
    doFirst{
     println "t2 f"
    }
    println "t2"
    doLast{
        println "t2 l"
    }
}
```

## 构建项目步骤

### 1、使用idea创建空gradle父项目：homework

- 父工程创建gradle项目
- 在idea配置中，设置gradle的来源从项目配置文件中获取：``'Wrapper' task inGradle build script`
- jdk的版本是14

![image-20200425204825422](/Users/lyn/Library/Application%20Support/typora-user-images/image-20200425204825422.png)

![image-20200425220043203](/Users/lyn/Library/Application%20Support/typora-user-images/image-20200425220043203.png)

### 2、配置父项目的属性文件

- 从`core-ng-demo-project`项目中拷贝gradle文件夹

> 2.1 settings.gradle

> 2.2 build.gradle

### 3、创建core-ng-start子项目的目录结构：

#### 创建方式1：创建空文件夹的方式

1. 在`settings.gradle`文件中引入子项目名称：`core-ng-start`

   ```groovy
   include 'core-ng-start'
   ```

2. 在父工程目录下，创建子工程文件夹：`core-ng-start`

3. 使用gradle插件，在菜单界面点击按钮''Reimport all gradle Projects”

   <img src="/Users/lyn/Library/Application%20Support/typora-user-images/image-20200425212509667.png" alt="image-20200425212509667" style="zoom:50%;" />

4. 在子工程下创建文件夹，会有提示

   <img src="/Users/lyn/Library/Application%20Support/typora-user-images/image-20200425212408690.png" alt="image-20200425212408690" style="zoom:50%;" />

    

#### 创建方式2：执行mkdir 的方式

1. 同“创建方式1”,在`settings.gradle`文件中引入子项目名称：`core-ng-start`

   ```groovy
   include 'core-ng-start'
   ```

2. 

### 4、给子项目配置项目依赖

- 在`build.gradle`文件新增子项目的配置依赖

```groovy
apply from: file("${rootDir}/gradle/project.gradle")

subprojects {
    group = 'core.demo'
    version = '1.0.0'
    
    repositories {
        maven {
            url 'https://neowu.github.io/maven-repo/'
            content {
                includeGroup 'core.framework'
            }
        }
    }
}

def coreNGVersion = '7.4.1'

project(':core-ng-started') {
    dependencies {
        implementation "core.framework:core-ng:${coreNGVersion}"
        testImplementation "core.framework:core-ng-test:${coreNGVersion}"
    }
}
```

### 5、写代码

> 1. 创建入口类：Main.java
> 2. 创建core.framework.module.App的实现类
> 3. 创建core.framework.module.Module的实现类
> 4. 创建测试类

# groovy语言	

定义：groovy是基于Java虚拟机的一种敏捷的动态语言，成熟的OOP编程语言，具有闭包和动态语言

语法：

> - 兼容Java语法，可以用作脚本、类
> - 语句以换行符结束，也可以使用分号
> - 类、字段、方法的访问类型都是公共的
> - 参数构造器：key:value
> - 字段可以用getter/setter或点来获取
> - 方法可以省略return方法
> - 空值比较不会有NPE异常抛出

高级特性

> - assert断言：
> - 可选类型：用def 来定义任意类型
> - 方法调用：
> - 字符串定义：单引号，双引号，三个单引号对（原样打印）
> - 集合API：
> - 闭包：

命令：

> Groovy -v
>
> groovyConsole

例子

```groovy
println ">>>>>>>>>>>>>打印<<<<<<<<<<<<<<<<<<"
println "hello"
println ">>>>>>>>>>>>>断言<<<<<<<<<<<<<<<<<<"
//assert 1==0
println ">>>>>>>>>>>>>定义变量<<<<<<<<<<<<<<<<<<"
def test="jan"
println test
println ">>>>>>>>>>>>>字符串<<<<<<<<<<<<<<<<<<"
def name="lyn"
println "myname:${name}"
println '''aaa
bbb'''
println ">>>>>>>>>>>>>集合<<<<<<<<<<<<<<<<<<"
def list=["a","b","c"]
list.add("add")
list << "hhh"
println "list>>>>"
println list
println list.getClass()

println "map>>>>"
def map=["name":"lyn","age":11]
map.put("email","aa@b.com")
map.gebder='male'
println map


```

**闭包语法**



# 文件

## gradle-wrapper.properties

1. 文件内容

> ```
> #Fri Apr 24 23:24:39 CST 2020
> distributionBase=GRADLE_USER_HOME
> distributionPath=wrapper/dists
> zipStoreBase=GRADLE_USER_HOME
> zipStorePath=wrapper/dists
> distributionUrl=https\://services.gradle.org/distributions/gradle-6.3-all.zip
> ```

2. 文件内容解析

>## distributionUrl

- 要下载的gradle的地址，使用哪个版本的gradle，就在这里修改

- 版本分类
  - gradle-xx-all.zip是完整版，包含了各种二进制文件，源代码文件，和离线的文档。
  - gradle-xx-bin.zip是二进制版，只包含了二进制文件（可执行文件），没有文档和源代码。
  - gradle-xx-src.zip是源码版，只包含了Gradle源代码，不能用来编译你的工程。

> zipStoreBase和zipStorePath

- `zipStoreBase`和`zipStorePath`组合在一起，是下载的gradle 所存放的位置。
- `zipStorePath`是`zipStoreBase`指定的目录下的子目录。

>  
> distributionBase 和distributionPath
> 

- `distributionBase`和`distributionPath`组合在一起，是解压gradle 之后的文件的存放位置。
- `distributionPath` 是`distributionBase`指定的目录下的子目录。

>GRADLE_USER_HOME

- 用户目录，在本机的环境变量中设置，默认是~/.gradle(mac)



## setting.gradle

1. 文件内容

>```
>include 'demo-service-interface',
>        'demo-service',
>        'demo-service-db-migration',
>        'demo-site',
>        'demo-es-migration',
>        'demo-mongo-migration',
>        'benchmark'
>
>//includeBuild '../core-ng-project'
>```

2. 解析

> include 

## build.gradle

1. 文件内容

   

2. 作用：

   - 用来配置当前项目的依赖信息

   - 文件中的配置，会被封装到Project对象中

     

3. 语法解析

4. 





## 语法解析

https://www.cnblogs.com/woms/p/7040771.html