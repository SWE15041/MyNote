[toc]

为什么要学react？

1. 原生JS操作dom繁琐，效率低
2. 使用JS直接操作dom，浏览器会进行大量的重绘重排
3. JS没有组件化编码方案，代码复用率低。
4. 



react的特点

1. 采用组件化模式、声明式编码，提高开发效率及组件复用率。
2. 在RN中可以使用react语法进行移动端开发。
3. 使用虚拟DOM+优秀的Diffing算法，尽量减少与真实DOM的交互。



学习react之前需要掌握的技能

1. es6
2. npm包管理器
3. 原型、原型链
4. this、class、数组
5. 模块化



官网

https://react.docschina.org/



依赖包：

1. Babel.min.js

2. React.development.js

3. React-dom.development.js

4. ?

   





编辑器

VS Code

快捷键：

command+！ ：填充html sample



# 基本概念

虚拟dom

- 本质是object类型的对象
- 虚拟dom比较轻？
- 虚拟dom最终会被react转化为真实的DOM，呈现到页面上

JSX （javascript XML）

- 类似于XML的JS的扩展语法

- 语法规则：

  ```
  定义虚拟dom时，不要写引号
  标签中混入js表达式时要用{}
  样式的类名制定不要用class，要用claseName
  内联样式要用style={{key:'value'}}的形式去写
  虚拟dom必须只有一个根标签
  标签必须闭合
  标签首字母：
      a.小写字母开头，则将标签改为html中同名元素
      b.若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错
  
  ```

- 模块

- 组件

- 模块化

- 组件化

XML

- 早期用于存储和传输数据



浏览器插件

chrome：React Developer Tools

# 组件

