##  一、find

### 命令格式
	find pathname -options [-print -exec -ok ...]
### 参数解析
	-pathname: find命令所查找的目录路径。例如/来表示系统根目录。
	-print： find命令将匹配的文件输出到标准输出。
	-printf： 按照指定格式输出。
	-exec： find命令对匹配的文件执行该参数所给出的shell命令。相应命令的形为'command' {  } \;，注意{   }和\；之间的空格。
	-ok： 和-exec的作用相同，只不过以一种更为安全的模式来执行该参数所给出的shell命令在执行每一个命令之前，都会给出提示，让用户来确定是否执行。
###  参考链接
http://www.360doc.com/content/19/1104/08/67160306_870969102.shtml





## 二、 locate（mac)

### 命令格式
	locate [OPTION]… [PATTERN]…
### 命令选项

### 说明：
locate命令其实是“find -name”的另一种写法，但是要比后者快得多，原因在于它不搜索具体目录，而是搜索一个数据库（/var/lib/locatedb），这个数据库中含有本地所有文件信息。Linux系统自动创建这个数据库，并且每天自动更新一次，所以使用locate命令查不到最新变动过的文件。为了避免这种情况，可以在使用locate之前，先使用updatedb命令，手动更新数据库。
### 例子
1.搜索目录下所有以 sh 开头的文件
    locate /etc/sh
2.


### 进行库更新
    sudo /usr/libexec/locate.updatedb 
### 参考
https://www.cnblogs.com/ajianbeyourself/p/8675529.html


## 三、which
which命令的作用是，在PATH变量指定的路径中，搜索某个系统命令的位置，并且返回第一个搜索结果。也就是说，使用which命令，就可以看到某个系统命令是否存在，以及执行的到底是哪一个位置的命令。

### which命令的使用实例：
```shell
which grep
```

## 四、whereis
whereis命令只能用于程序名的搜索，而且只搜索二进制文件（参数-b）、man说明文件（参数-m）和源代码文件（参数-s）。如果省略参数，则返回所有信息。

### whereis命令的使用实例：　
```shell
whereis grep
```


　
## 五、 type
type命令其实不能算查找命令，它是用来区分某个命令到底是由shell自带的，还是由shell外部的独立二进制文件提供的。如果一个命令是外部命令，那么使用-p参数，会显示该命令的路径，相当于which命令。

### type命令的使用实例：
```shell
type cd
```
解析：系统会提示，cd是shell的自带命令（build-in）。