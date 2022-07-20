[toc]

30*150/60/3 =25

一集30分钟 150集 3小时 3*60

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

  ```
  作用：复用js 简化js的编写 提高js的运行效率
  一个模块一般就是一个js文件
  
  ```

  

- 组件

  ```
  分类：函数式组件 和 类式组件
  定义：用来实现局部功能效果的代码和资源的集合（html、css、js等）。
  函数式组件内的this：undefined ()
  类式组件内的this：XXX组件对象（XXX的实例对象）
  ```

  

- 模块化

- 组件化

XML

- 早期用于存储和传输数据



# 浏览器插件

chrome：React Developer Tools



react 工作原理

1. React 解析组件标签，找到了XXX组件
2. 将虚拟DOM转化成真实的DOM渲染。

# 组件

**函数式组件**

无state

- demo

  ```jsx
  <script type="text/babel">
    // 函数组件的定义(首字母大写)
    function Demo(){
      console.log(this)// undefined
      return <h2>"函数定义的组件"</h2>
    }
    // 函数组件的调用：<Demo/>
    ReactDOM.render(<Demo/>,document.getElementById('test'))
  </script>
  ```

**类式组件**

有state



## 组件的三大核心属性（类式组件）

## state

1. state是组件对象最重要的属性，值是对象（多个key-value的组合）
2. 组件被称为“状态机”，通过更新组件的state来更新对应的页面显示（重新渲染组件）

PS：

1. 组件render方法中的this为组件实例对象
2. 组件自定义的方法中的this为undefined，如何解决
   - 强制绑定this：通过函数对象的bind()
   - 箭头函数
3. 状态数据，不能直接修改或者更新，要调用setState方法进行状态的合并。

## props



## refs(已弃用)





# Common

MDN: https://developer.mozilla.org/zh-CN/docs/Learn

展开运算符 ...

```js
  <script type="text/javascript">
        // 展开运算符...
        let arr1 = [1,2,3]
        let arr2 = ['a','b','c']
        // 展开数组
        console.log(...arr1)// 1 2 3
        let arr3 = [...arr1, ...arr2]
        // 连接数组
        console.log(arr3) // 1, 2, 3, 'a', 'b', 'c'
        //
        function sum(...numbers) {
          return  numbers.reduce((preValue,currentValue)=>{return preValue+currentValue})
        }
        console.log(sum(1,2,3,4)) // 10
        // 构造字面量对象时使用展开语法
        let person1 = {name:'tom', age: 18}
        let person2 = {...person1}
        // console.log(..person1)// 报错，展开运算符不能展开对象
        person1.name = 'jerry'
        console.log(person1)
        console.log(person2)
        // 合并
        let pseson3 = {...person1,name:'jack', address:'china'}
        console.log(pseson3)
    </script>
```

