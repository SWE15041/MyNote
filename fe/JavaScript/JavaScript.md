[toc]

## 一、简史

1. ECMAScript是一种语言标准,JavaScript是网景公司对ECMAScript标准的一种实现。
2. ECMAScript 6标准（简称ES6）。
3. ECMAScript第一版标准发布于：1997年。

## 二、基础

### 1. 基本语法

####  1.1 语法：

- 语句：语句以分号“；”结束，（浏览器也会自动补全语句的分号）
- 语句块：以花括号概括{....}

#### 1.2 注释：

- 单行注释：//
- 多行注释：/* ..... */

#### 1.3 数据类型：

- Number: 整数、浮点数、科学计数法、负数、NaN、Infinity等

- 字符串：以”单引号“或”双引号“括起来的任何文本；
-  ES6新增标准

      1. “多行字符串”：以反引号包含起来，可以原样打印。例：
        
          ```js
          console.log(`多行
          字符串
          测试`)
          ```
          
      2. “模板字符串”：字符串用反引号包含，自动解析${变量名}的值。例：
        
          ```js
          var message = `你好, ${name}`;
          ```
          
      3. “操作字符串”：索引值从0开始，字符串是不可变量，可以根据索引号取值，但是不能根据索引号修改值；


- 常用函数举例：
  ```js
  var s = 'Hello';
  // 返回'HELLO' ；转大写
  console.log(s.toUpperCase());
  // 返回'hello'；转小写
  console.log(s.toLowerCase());
  // 返回3；获取开始索引值
  console.log(s.indexOf('lo'));
  // 返回 'Hel'；根据索引值获取值，前闭后开；单个参数，表示从指定索引值到结束；
  console.log( s.substring(0, 3));    
  ```




- 布尔值：true、false、0、1、表达式（2>1）

- 对象：由**键-值对**组成的**无序**集合。以`对象变量.属性名` 方式取值

  ```javascript
  // 1. 创建对象，给对象赋值；
  var person = {
      name: 'Bob',
      age: 20,
      tags: ['js', 'web', 'mobile'],
      city: 'Beijing',
      hasCar: true,
      zipcode: null,
    	'school-name':"xum"
  };
  // 2.获取对象属性值；
      // 2.1 获取对象普通属性值：
      person.name; // 'Bob'
      person.zipcode; // null
  		person['name']; // 'Bob'
  		// 2.2 获取对象属性名字为 由引号概括的字符串 的属性值
  		person['school-name']//"xum"
  		console.log(person.'school-name');	//SyntaxError: Unexpected string
  // 3. 修改对象属性值；
   person.name='小明';
   console.log( person.name);//'小明'
  // 4. 删除对象属性
  delete person.age;
  console.log(person.age);//undefined
  // 5. 判断是否包含某个属性
      // 5.1 可以判断包含继承的属性：所有对象最终都会在原型链上指向object，所以xiaoming也拥有toString属性。		
  		var isIncludeName='name' in person;
  		console.log(isIncludeName);//true
  		console.log('toString' in xiaoming); // true; 
  		// 5.2 判断属性是否为自身拥有的，而不是继承得到的；
  		var hasName = person.hasOwnProperty('name')
  		console.log(hasName); // true
  		var hasToString = person.hasOwnProperty('toString'); 
  		console.log(hasToString);// false
  // 6.
  
  ```
```

  

  

- 变量：变量名是大小写英文、数字、`$`和`_`的组合，且不能用数字开头。

  ```js
  //声明变量
  var a = 123; // a的值是整数123,局部变量
  // 当前页的全局变量
  i = 10; // i现在是全局变量
  //strict模式：在strict模式下运行的JavaScript代码，强制通过var申明变量，未使用var申明变量就使用的，将导致运行错误。
  'use strict';
```

  

- null和undefined: `null`表示一个空的值，而`undefined`表示值未定义。(大多数情况下，我们都应该用`null`。`undefined`仅仅在判断函数参数是否传递的情况下有用。)

- 数组：由一组按**顺序排列**的集合，集合的每个值称为元素。数组可以包括任意数据类型。数组用`[]`表示，元素之间用`,`分隔。例：`var arr = [1, 2, 3.14, 'Hello', null, true];`

   注：slice、splice

  ```js
  // 1. 数组可以包含任意数据类型，并通过索引来访问元素
  var arr = [1, 2, 3.14, 'Hello', null, true];
  // 2. 给数组length 赋值会修改原始数组的大小
  var arr = [1, 2, 3];
  arr.length; // 返回3
  arr.length = 6;
  console.log(arr); // arr变为[1, 2, 3, undefined, undefined, undefined]
  arr.length = 2;
  console.log(arr); // arr变为[1, 2]
  // 3. 通过索引来修改元素值
  var arr = [1, 2, 3];
  arr[5] = 'x';
  console.log(arr); // arr变为[1, 2, 3, undefined, undefined, 'x']
  // 4. 数组增查改删
  var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  arr.indexOf('A');// 获取元素的索引；返回：0；
  arr.slice(0, 3); // 截取子串，如果参数为空，则截取所有元素；从索引0开始，到索引3结束，但不包括索引3，返回: ['A', 'B', 'C']；
  arr.slice(3); // 返回从索引3开始到结束: ['D', 'E', 'F', 'G']
  
  arr.push('A', 'B'); // 向末尾添加元素；返回Array新的长度: 9；
  arr.pop(); // 向末尾删除元素； 返回：'B'；
  
  arr.unshift('A', 'B'); //向头部添加元素；返回长度:10 ；
  arr.shift(); // 向末尾删除一个元素；返回删除的元素：'A'; 
  
  arr.sort();//默认升序；返回：[A,A,B,B,C,D,E,F,G]
  
  //-它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素：
  arr.splice(2, 3, 'Google', 'Facebook');// 从索引2开始删除3个元素,然后再添加两个元素:
  console.log(arr);// 返回：[A,A,Google,Facebook,D,E,F,G]
  arr.splice(2, 2);//只删除,不添加: ['Google', 'Facebook']
  console.log(arr);// 返回：[A,A,D,E,F,G]
  arr.splice(2, 0, 'Google', 'Facebook'); // 只添加,不删除:
  console.log(arr);// 返回：[A,A,Google,Facebook,D,E,F,G]
  
  //-拼接数组
  var added = arr.concat([1, 2, 3]);
  console.log(added);// arr不变，added返回：[A,A,Google,Facebook,D,E,F,G,1,2,3] 
  var arr = ['A', 'B', 'C'];
  arr.concat(1, 2, [3, 4]); // arr不变，返回：['A', 'B', 'C', 1, 2, 3, 4]
  
  //-数组转字符串，并使用凭拼接符
  arr.join('-'); // arr不变，返回'A-B-C'
  
  // 5. 多维数组
  'use strict';
  var arr = [[1, 2, 3], [400, 500, 600], '-'];
  var x = arr[1][1];
  console.log(x);	// 返回：500
  var str='欢迎';
  for (var i=0;i< arr.length-1 ;i++){
      if (arr.length-2==i){
       str+=arr[i];
       break;
      }
      str+=arr[i]+","; 
  }
  str+="和"+arr[arr.length-1];
  console.log(str);
  
  ```

  

####  1.4 程序基本结构：

定义：程序的基本结构为 顺序结构、选择结构、循环结构

顺序结构：

选择结构：

- 条件判断(同Java)

  ```js
  if () { ... } else { ... }
  if () { ... } else if() { ... } else { ... }
  ```

  

循环结构：

- 普通for循环：for( var i=0  ; i<= n ; i++)

  ```js
  for (;;) { ... }
  ```

- 增强for循环：for ... in  ；（遍历对象的属性，或者遍历数组的索引）

  ```js
  //对象
  var o = {
      name: 'Jack',
      age: 20,
      city: 'Beijing'
  };
  for (var key in o) {
      console.log(key); // 'name', 'age', 'city'
  }
  //Array
  var a = ['A', 'B', 'C'];
  for (var i in a) {
      console.log(i); // '0', '1', '2'
      console.log(a[i]); // 'A', 'B', 'C'
  }
  ```

  

- while ( ... ) { ... }

  ```js
  var x = 0;
  var n = 99;
  while (n > 0) {
      x = x + n;
      n = n - 2;
  }
  console.log(x); //2500
  ```

  

- do { ... } while ( ... )

  ```js
  var n = 0;
  do {
      n = n + 1;
  } while (n < 100);
  console.log(n); //100
  ```

  

  

#### 1.5 集合

- Map（ES6引入）

  - 定义：Map是一组键值对的结构，具有极快的查找速度。

  - 声明：

    ```js
    //方式一：在new的时候直接赋值
    var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
    //方式二：先new再赋值
    var m = new Map(); // 空Map
    m.set('Adam', 67); // 添加新的key-value
    m.set('Bob', 59);
    m.has('Adam'); // 是否存在key 'Adam': true
    m.get('Adam'); // 67
    m.delete('Adam'); // 删除key 'Adam'
    m.get('Adam'); // undefined
    m.set(null,11);
    m.set(null,12);
    console.log(m.get(null));//12
    ```

  - 遍历

    ```js
    var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
    m.get('Michael'); // 95
    for(var i of m){
      console.log(i);
    }
    // Michael,95
    // Bob,75
    // Tracy,85
    ```

    

- Set

  - 定义：元素不能重复

  - 声明：

    ```js
    // 方式一：在new的时候直接赋值
    var s1 = new Set([1, 2, 3, 3, '3']);
    // 方式二：先new再进行其他操作
    var s1 = new Set(); // 空Set
    ```

  - 遍历

    ```js
    // 遍历： 1 2 3 '3'
    var s1 = new Set([1, 2, 3, 3, '3']);
    for(var i of s1){
       console.log(i);
    }
    //新增
    s1.add(4);
    //删除
    s1.delete(4);
    
    ```

    

  

 #### 1.6 迭代器

 ##### - iterable

  - 定义：为了统一集合类型，ES6标准引入了新的`iterable`类型，`Array`、`Map`和`Set`都属于`iterable`类型。

  - 遍历：`for ... of`循环

    ```js
    var a = ['A', 'B', 'C'];
    var s = new Set(['A', 'B', 'C']);
    var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
    for (var x of a) { // 遍历Array
        console.log(x);
    }
    // A
    // B
    // C
    for (var x of s) { // 遍历Set
        console.log(x);
    }
    // A
    // B
    // C
    for (var x of m) { // 遍历Map
        console.log(x[0] + '=' + x[1]);
    }
    // 1=x
    // 2=y
    // 3=z
    ```

    

  - 遍历：`iterable`内置的`forEach`方法

    ```js
    'use strict';
    // 1. 遍历普通数组Array
    var a = ['A', 'B', 'C'];
    a.forEach(function (element, index, array) {
        // element: 指向当前元素的值
        // index: 指向当前索引
        // array: 指向Array对象本身
        console.log(element + ', index = ' + index);
    });
    // A, index = 0
    // B, index = 1
    // C, index = 2
    
    // 2. 遍历Set
    var s = new Set(['A', 'B', 'C']);
    s.forEach(function (element, sameElement, set) {
        console.log(element);
    });
    // A
    // B
    // C
    
    // 3. 遍历Map
    var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
    m.forEach(function (value, key, map) {
        console.log( key+':'+value);
    });
    // 1:x
    // 2:y
    // 3:z
    ```

    



## 三、 函数

### 1. 函数的定义
- 一旦执行到`return`时，函数就执行完毕，并将结果返回。如果没有`return`语句，函数执行完毕后也会返回结果，只是结果为`undefined`。

   ```js
   // function abs(x){}
   function abs(x) {
       if (x >= 0) {
           return x;
       } else {
           return -x;
       }
   }
   // 将匿名函数赋值给变量
   var abs = function (x) {
       if (x >= 0) {
           return x;
       } else {
           return -x;
       }
   };
   // 上述两种定义完全等价，注意第二种方式按照完整语法需要在函数体末尾加一个;，表示赋值语句结束。
   ```

   

### 2. arguments

   关键字`arguments`，它只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。`arguments`类似`Array`但它不是一个`Array`

   ```js
   function foo(x) {
       console.log('x = ' + x); // 10
       for (var i=0; i<arguments.length; i++) {
           console.log('arg ' + i + ' = ' + arguments[i]); // 10, 20, 30
       }
   }
   foo(10, 20, 30);
   ```

    输出

   ```
   x = 10
   arg 0 = 10
   arg 1 = 20
   arg 2 = 30
   ```

### 3. rest参数

   获取除了函数已经定义之外的其他参数，如果传入的参数连正常定义的参数都没填满，也不要紧，rest参数会接收一个空数组（注意不是`undefined`）。

   ```js
   function foo(a, b, ...rest) {
       console.log('a = ' + a);
       console.log('b = ' + b);
       console.log(rest);
   }
   
   foo(1, 2, 3, 4, 5);
   // 结果:
   // a = 1
   // b = 2
   // Array [ 3, 4, 5 ]
   foo(1);
   // 结果:
   // a = 1
   // b = undefined
   // Array []
   ```

   

### 4. 函数变量作用域

   如果一个变量在函数体内部申明，则该变量的作用域为整个函数体，在函数体外不可引用该变量：	

### 5. 变量提升： 是声明的提升

   JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有声明的变量“提升”到函数顶部：

   ```js
   'use strict';
   
   function foo() {
       var x = 'Hello, ' + y;
       console.log(x);
       var y = 'Bob';
   }
   
   foo();
   // Hello, undefined
   ```

   以上等同于：

   ```js
   function foo() {
       var y; // 提升变量y的申明，此时y为undefined
       var x = 'Hello, ' + y;
       console.log(x);
       y = 'Bob';
   }
   ```

   

### 6. 全局作用域

   定义：不在任何函数内定义的变量就具有全局作用域。

   -   实际上，JavaScript默认有一个全局对象`window`，全局作用域的变量实际上被绑定到`window`的一个属性：

   ```js
   'use strict';
   var course = 'Learn JavaScript';
   alert(course); // 'Learn JavaScript'
   alert(window.course); // 'Learn JavaScript'
   ```

   - 以变量方式`var foo = function () {}`定义的函数实际上也是一个全局变量，顶层函数的定义也被视为一个全局变量，并绑定到`window`对象：

     ```js
     'use strict';
     
     function foo() {
         alert('foo');
     }
     
     foo(); // 直接调用foo()
     window.foo(); // 通过window.foo()调用
     ```

     

### 7. 名字空间

   定义：全局变量会绑定到`window`上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现。

   减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：

   ```js
   // 唯一的全局变量MYAPP:
   var MYAPP = {};
   
   // 其他变量:
   MYAPP.name = 'myapp';
   MYAPP.version = 1.0;
   
   // 其他函数:
   MYAPP.foo = function () {
       return 'foo';
   };
   ```

   

### 8. 局部作用域

   定义：ES6引入了新的关键字`let`，用`let`替代`var`可以申明一个块级作用域的变量；

   ```js
   'use strict';
   
   function foo() {
       var sum = 0;
       for (let i=0; i<100; i++) {
           sum += i;
       }
       // SyntaxError:
       i += 1;
   }
   ```

   

### 9. 常量

   定义：ES6标准引入了新的关键字`const`来定义常量，`const`与`let`都具有块级作用域：

   ```js
   'use strict';
   
   const PI = 3.14;
   PI = 3; // 某些浏览器不报错，但是无效果！
   PI; // 3.14
   ```

   

### 10.  **解构赋值**

   定义：从ES6开始，JavaScript引入了解构赋值，可以同时对一组变量进行赋值。

   ```js
   var array = ['hello', 'JavaScript', 'ES6'];
   var x = array[0];
   var y = array[1];
   var z = array[2];
   ```

   解构赋值:

   ```js
   'use strict';
   var [x, y, z] = ['hello', 'JavaScript', 'ES6'];
   // x, y, z分别被赋值为数组对应元素:
   console.log('x = ' + x + ', y = ' + y + ', z = ' + z);
   // x = hello, y = JavaScript, z = ES6
   ```

   

### 11. this 、apply( )、 call( )

    - this 指向调用者本身 或 指向全局变量window
    
    - apply ：指定this对象，将其他参数打包成Array再传入
    
    - call()：区别于apply函数，它将参数按顺序传入；
    
      ```js
      Math.max.apply(null, [3, 5, 4]); // 5
      Math.max.call(null, 3, 5, 4); // 5
      ```


​      

​    

### 12. 高阶函数

#### 定义：编写高阶函数，就是让函数的参数能够接收别的函数。

    ```js
    'use strict';
    
    function add(x, y, f) {
        return f(x) + f(y);
    }
    var x = add(-5, 6, Math.abs); // 11
    console.log(x);
    
    ```

####  map()
		- 定义：`map()`传入的参数是函数对象本身。
	
	  ```js
	  'use strict';
	  
	  function pow(x) {
	      return x * x;
	  }
	  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	  var results = arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
	  console.log(results);
	  
	  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	  arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
	  ```


​      

 #### reduce()

    - 语法：对象.reduce(function (x,y){ ... })
    
    - 解析：将数组对象的参数传入函数中运算，第一次必须传入两个参数，将第一运算的结果作为参数与下一个数组元素进行运算
    
    - 案例1 ：
    
      ```js
      //解释：Array的reduce() 把一个函数作用在Array的元素上，这个函数必须接收两个参数，将返回的结果与下一个元素一起做累积运算；	
      var arr = [1, 3, 5, 7, 9];
      arr.reduce(function (x, y) {
          return x + y;
      }); // 25
      ```
    
      - 案例2 : 利用`reduce()`求积
    
      ```js
      'use strict';
      
      function product(arr) {
          
      var result = arr.reduce(function (x,y){
      return x* y;
      });
      return result;
      }
      
      // 测试:
      if (product([1, 2, 3, 4]) === 24 && product([0, 1, 2]) === 0 && product([99, 88, 77, 66]) === 44274384) {
          console.log('测试通过!');
      }
      else {
          console.log('测试失败!');
      }
      ```
    
      - 案例3 :不要使用JavaScript内置的parseInt()函数，利用map和reduce操作实现一个string2int()函数
    
        ```js
        'use strict';
        
        function string2int(s) {
           let arr = [];
           for (let i = 0; i < s.length; ++i) {
               arr.push(s.charAt(i))
           }
          return arr.map((x) => x -= '0').reduce((x, y) => (x*10+y));
        }
        
        // 测试:
        if (string2int('0') === 0 && string2int('12345') === 12345 && string2int('12300') === 12300) {
            if (string2int.toString().indexOf('parseInt') !== -1) {
                console.log('请勿使用parseInt()!');
            } else if (string2int.toString().indexOf('Number') !== -1) {
                console.log('请勿使用Number()!');
            } else {
                console.log('测试通过!');
            }
        }
        else {
            console.log('测试失败!');
        ```
    
      - 案例4 ：请把用户输入的不规范的英文名字，变为首字母大写，其他小写的规范名字。输入：`['adam', 'LISA', 'barT']`，输出：`['Adam', 'Lisa', 'Bart']`。
    
        ```js
        'use strict';
        
        function normalize(arr) {
            return arr.map(x => x.toLowerCase()).map(x => x.charAt(0).toUpperCase()+ x.substring(1));
        }
        
        // 测试:
        if (normalize(['adam', 'LISA', 'barT']).toString() === ['Adam', 'Lisa', 'Bart'].toString()) {
            console.log('测试通过!');
        }
        else {
            console.log('测试失败!');
        }
        ```
    
    - filter( )：
    
      -  `Array`的`filter()`也接收一个函数。
      - `filter()`把传入的函数依次作用于每个元素，然后根据返回值是`true`还是`false`决定保留还是丢弃该元素。
    
      ```js
      //把传入的函数作用于每一个元素
      //例子1: 过滤掉偶数
      var arr = [1, 2, 4, 5, 6, 9, 10, 15];
      var r = arr.filter(function (x) {
          return x % 2 !== 0;
      });
      r; // [1, 5, 9, 15]
      // 例子2 ：传入三个参数的函数：function(元素本身，索引，数组本身)
      var arr = ['A', 'B', 'C'];
      var r = arr.filter(function (element, index, self) {
          console.log(element); // 依次打印'A', 'B', 'C'
          console.log(index); // 依次打印0, 1, 2
          console.log(self); // self就是变量arr
          return true;
      });
      ```


​      

#### - sort( )

      - `Array`的`sort()`方法默认把所有元素先转换为String，再根据ASCII码进行排序；
    
      - `sort()`方法也是一个高阶函数，它还可以接收一个`比较函数`来实现自定义的排序。
    
      - `sort()`方法会直接对`Array`进行修改，它返回的结果仍是当前`Array`：
    
        ```js
        // 排序结果作用于数组本身
        var a1 = ['B', 'A', 'C'];
        var a2 = a1.sort();
        a1; // ['A', 'B', 'C']
        a2; // ['A', 'B', 'C']
        console.log(a1 === a2); // true, a1和a2是同一对象
        
        //排序
        'use strict';
        var arr = [10, 20, 1, 2];
        arr.sort(function(x,y){
            return x-y;
        });
        // 箭头函数用法 ：arr.sort((x, y) => x-y );
        console.log(arr); // [1, 2, 10, 20]
        
        // apple排在了最后:
        ['Google', 'apple', 'Microsoft'].sort(); // ['Google', 'Microsoft", 'apple']
        
        // 转字符串再通过ASCLL码进行比较
        [10, 20, 1, 2].sort(); // [1, 10, 2, 20]
        ```
      ```


​        
​      ```

####   - Arrary

      - `every()`方法可以判断数组的`所有元素`是否满足测试条件。
    
      ```js
      var arr = ['Apple', 'pear', 'orange'];
      console.log(arr.every(function (s) {
          return s.length > 0;
      })); // true, 因为每个元素都满足s.length>0
      
      ```
    
      - `find()`方法用于查找符合条件的第一个元素，如果找到了，返回这个元素，否则，返回`undefined`：
    
      ```js
      var arr = ['Apple', 'pear', 'orange'];
      console.log(arr.find(function (s) {
          return s.toLowerCase() === s;
      })); // 'pear', 因为pear全部是小写
      
      ```


​        

      - `findIndex()`和`find()`类似，也是查找符合条件的第一个元素，不同之处在于`findIndex()`会返回这个元素的索引，如果没有找到，返回`-1`：
    
        ```js
        var arr = ['Apple', 'pear', 'orange'];
        console.log(arr.findIndex(function (s) {
            return s.toLowerCase() === s;
        })); // 1, 因为'pear'的索引是1
        ```


​        

      - `forEach()`和`map()`类似，它也把每个元素依次作用于传入的函数，但不会返回新的数组。`forEach()`常用于遍历数组，因此，传入的函数不需要返回值：
    
        ```js
        var arr = ['Apple', 'pear', 'orange'];
        arr.forEach(console.log); // 依次打印每个元素
        // Apple
        // pear
        // orange
        ```


​        

    - 
      ​    

### 13. **闭包**(看不懂)

​    

### 14. 箭头函数

    - 语法格式：（参数列表）=> {方法体}
    
    - s 
    
    - this：箭头函数完全修复了`this`的指向，`this`总是指向词法作用域，也就是外层调用者`obj`：
    
      ```js
      var obj = {
          birth: 1990,
          getAge: function () {
              var b = this.birth; // 1990
              var fn = function () {
                  return new Date().getFullYear() - this.birth; // this指向window或undefined
              };
              return fn();
          }
      };
      // 正确
      var obj = {
          birth: 1990,
          getAge: function () {
              var b = this.birth; // 1990
              var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
              return fn();
          }
      };
      obj.getAge(); // 25
      ```


​      

### 15. **generator** （看不懂）

    - 定义：generator（生成器）是ES6标准引入的新的数据类型。
    - 

### 16. qit



## 四、标准对象

### 1. 在JavaScript的世界里，一切都是对象。

####  typeof 

定义：`typeof`操作符可以判断出`number`、`boolean`、`string`、`function`和`undefined`；

  ```js
  typeof 123; // 'number'
  typeof NaN; // 'number'
  typeof 'str'; // 'string'
  typeof true; // 'boolean'
  typeof undefined; // 'undefined'
  typeof Math.abs; // 'function'
  typeof null; // 'object'
  typeof []; // 'object'
  typeof {}; // 'object'
  ```

  

####   包装对象

  - `number`、`boolean`和`string`都有包装对象。(建议：不要使用包装对象)

    ```js
    typeof new Number(123); // 'object'
    new Number(123) === 123; // false
    
    typeof new Boolean(true); // 'object'
    new Boolean(true) === true; // false
    
    typeof new String('str'); // 'object'
    new String('str') === 'str'; // false
    ```

####  规则小结

  ```js
  不要使用new Number()、new Boolean()、new String()创建包装对象；
  用parseInt()或parseFloat()来转换任意类型到number；
  用String()来转换任意类型到string，或者直接调用某个对象的toString()方法；
  通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}；
  typeof操作符可以判断出number、boolean、string、function和undefined；
  判断Array要使用Array.isArray(arr)；
  判断null请使用myVar === null；
  判断某个全局变量是否存在用typeof window.myVar === 'undefined'；
  函数内部判断某个变量是否存在用typeof myVar === 'undefined'。
  ```

  

### 2. Date

- 注：JavaScript的Date对象月份值从0开始，牢记0=1月，1=2月，2=3月，……，11=12月。

-  使用Date.parse()时传入的字符串使用实际月份01~12，转换为Date对象后getMonth()获取的月份值为0~11。

  ```js
  //获取时间相关信息
  var now = new Date();
  now; // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
  now.getFullYear(); // 2015, 年份
  now.getMonth(); // 5, 月份，注意月份范围是0~11，5表示六月
  now.getDate(); // 24, 表示24号
  now.getDay(); // 3, 表示星期三
  now.getHours(); // 19, 24小时制
  now.getMinutes(); // 49, 分钟
  now.getSeconds(); // 22, 秒
  now.getMilliseconds(); // 875, 毫秒数
  now.getTime(); // 1435146562875, 以number形式表示的时间戳
  // 创建指定的时间1
  var d = new Date(2015, 5, 19, 20, 15, 30, 123);
  d; // Fri Jun 19 2015 20:15:30 GMT+0800 (CST)
  // 创建指定的时间2
  var d = new Date(1435146562875);
  d; // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
  d.getMonth(); // 5
  
  ```

  

### 3. RegExp



### 4. JSON

#### 4.1 序列化

- 定义：JSON是JavaScript Object Notation的缩写，它是一种数据交换格式。对象转换成JSON格式数据。

- JSON的数据类型：

  ```js
  number：和JavaScript的number完全一致；
  boolean：就是JavaScript的true或false；
  string：就是JavaScript的string；
  null：就是JavaScript的null；
  array：就是JavaScript的Array表示方式——[]；
  object：就是JavaScript的{ ... }表示方式。
  ```

  

- JSON.stringify(参数1，参数2 ，参数3);

  - 参数1：需要序列化对象
  - 参数2：可选值
    	      - a.定义需要序列化的key数组
    	      - b. 函数，可以对所有的键值对进行其他处理
  - 参数3：可选值，格式化序列缩进的大小；

- 举例：JSON.stringify(对象);

  ```js
  'use strict';
  var xiaoming = {
      name: '小明',
      age: 14,
      gender: true,
      height: 1.65,
      grade: null,
      'middle-school': '\"W3C\" Middle School',
      skills: ['JavaScript', 'Java', 'Python', 'Lisp']
  };
  var s = JSON.stringify(xiaoming);
  console.log(s);
  //{"name":"小明","age":14,"gender":true,"height":1.65,"grade":null,"middle-school":"\"W3C\" Middle School","skills":["JavaScript","Java","Python","Lisp"]}
  ```

- 举例2：参数2传入函数，函数对所有的属性值都变成大写：

  ```js
  function convert(key, value) {
      if (typeof value === 'string') {
          return value.toUpperCase();
      }
      return value;
  }
  
  JSON.stringify(xiaoming, convert, '  ');
  ```

  

- 举例3：在对象内精确控制需要序列化的属性：`toJSON()`方法，直接返回JSON应该序列化的数据。
  
  ```js
  var xiaoming = {
      name: '小明',
      age: 14,
      gender: true,
      height: 1.65,
      grade: null,
      'middle-school': '\"W3C\" Middle School',
      skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
      toJSON: function () {
          return { // 只输出name和age，并且改变了key：
              'Name': this.name,
              'Age': this.age
          };
      }
  };
  
  JSON.stringify(xiaoming); // '{"Name":"小明","Age":14}'
  ```
  
  

#### 4.2 反序列化

- 定义：JSON格式数据转化成对象。

- JSON.parse(参数1，参数2)：

  - 参数1：json序列

  - 参数2：可选值

    - 函数：可以对需要反序列化的键值对进行其他处理;

  - 作用：用`JSON.parse()`把它变成一个JavaScript对象：

- 举例：

  ```js
  var obj = JSON.parse('{"name":"小明","age":14}', function (key, value) {
      if (key === 'name') {
          return value + '同学';
      }
      return value;
  });
  console.log(JSON.stringify(obj)); // {name: '小明同学', age: 14}
  
  ```


## 五、面向对象编程（我傻了）

### 5.1 概念

- 定义：JavaScript不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。



### 5.2 创建对象



### 5.3 原型继承



### 5.4 class继承

## 六、浏览器

### 1 浏览器对象

#### 1.1 window
- 定义：window对象不但充当全局作用域，而且表示浏览器窗口。
#### 1.2 navigator
- 定义：navigator对象表示浏览器的信息，最常用的属性包括：
    ```js
    navigator.appName：浏览器名称；
    navigator.appVersion：浏览器版本；
    navigator.language：浏览器设置的语言；
    navigator.platform：操作系统类型；
    navigator.userAgent：浏览器设定的User-Agent字符串。
    ```
    
#### 1.3 screen
- 定义：screen对象表示屏幕的信息，常用的属性有：
    ```
    screen.width：屏幕宽度，以像素为单位；
    screen.height：屏幕高度，以像素为单位；
    screen.colorDepth：返回颜色位数，如8、16、24。
    ```
#### 1.4 location
- 定义：location对象表示当前页面的URL信息。例如，一个完整的URL：
- 常用属性：
```js
location.href// 当前页面的URL（http://www.example.com:8080/path/index.html?a=1&b=2#TOP）
location.protocol; // 'http'
location.host; // 'www.example.com'
location.port; // '8080'
location.pathname; // '/path/index.html'
location.search; // '?a=1&b=2'
location.hash; // 'TOP'
location.assign();//加载新的页面
location.reload();//重载当前页面
```

#### 1.5 document

- 定义：`document`对象表示当前页面。由于HTML在浏览器中以DOM形式表示为树形结构，`document`对象就是整个DOM树的根节点。
- 

#### 1.6 history
- 定义：history对象保存了浏览器的历史记录，JavaScript可以调用history对象的back()或forward ()，相当于用户点击了浏览器的“后退”或“前进”按钮。
- 注：任何情况，你都不应该使用history这个对象了。

### 2 操作dom
#### 2.1 获取dom节点
- dom定义: 由于HTML文档被浏览器解析后就是一棵DOM树，要改变HTML的结构，就需要通过JavaScript来操作DOM。
- innerText： 获取文本内容；
- children：获取所有的直接孩子节点；
- firstElementChild：第一个直接子节点
- lastElementChild：最后一个直接子节点
```js
// 返回ID为'test'的节点：
var test = document.getElementById('test');

// 先定位ID为'test-table'的节点，再返回其内部所有tr节点：
var trs = document.getElementById('test-table').getElementsByTagName('tr');

// 先定位ID为'test-div'的节点，再返回其内部所有class包含red的节点：
var reds = document.getElementById('test-div').getElementsByClassName('red');

// 获取节点test下的所有直属子节点:
var cs = test.children;

// 获取节点test下第一个、最后一个子节点：
var first = test.firstElementChild;
var last = test.lastElementChild;
```
- querySelector
- querySelectorAll
```js
// 通过querySelector获取ID为q1的节点：
var q1 = document.querySelector('#q1');

// 通过querySelectorAll获取q1节点内的符合条件的所有节点：
var ps = q1.querySelectorAll('div.highlighted > p');
```
#### 2.2 更新DOM
- innerHTML：修改DOM节点的文本内容，或者修改DOM节点内部的子树；
- innerText：
- 修改节点CSS样式：
```js
// 获取<p id="p-id">...</p>
var p = document.getElementById('p-id');
//设置节点内容
p.innerHTML="JavaScript";
// 设置CSS:
p.style.color = '#ff0000';
p.style.fontSize = '20px';
p.style.paddingTop = '2em';
```
#### 2.3 插入DOM
- appendChild()：追加子节点
- createElement()：创建一个节点
- setAttribute()：设置节点属性
- innerHTML：设置节点内容
- insertBefore():把节点插入到指定的位置
#### 2.4 删除DOM
- removeChild()
- parentElement
```js
// 拿到待删除节点:
var self = document.getElementById('to-be-removed');
// 拿到父节点:
var parent = self.parentElement;
// 删除:
var removed = parent.removeChild(self);
removed === self; // true
```
#### 2.5 表单
- input 获取值、设置值：value、checked
- input 

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

## 七、JQuery

### 1. JQuery对象

- 定义：jQuery对象类似数组，它的每个元素都是一个引用了DOM节点的对象。

- 特点：

  - jQuery的选择器不会返回`undefined`或者`null`；
  - jQuery对象和DOM对象之间可以互相转化：

- 例子：

  ```
  // 查找<div id="abc">:
  var div = $('#abc');
  //[<div id="abc">...</div>]
  //div不存在时返回：[]
  ```

  

### 2. 选择器
#### 2.1 普通选择器
- 按ID查找：$('#ID')

  ```
  
  ```

  

- 按tag查找：$('tag')

  ```js
  //按tag查找只需要写上tag名称就可以了：
  
  var ps = $('p'); // 返回所有<p>节点
  ps.length; // 数一数页面有多少个<p>节点
  ```

  

- 按class查找 ：$('.class')

  ```js
  //按class查找注意在class名称前加一个.：
  var a = $('.red'); // 所有节点包含`class="red"`都将返回
  // 例如:
  // <div class="red">...</div>
  // <p class="green red">...</p>
  
  
  // 通过多个class查找，class之间不能用空格：
  var a = $('.red.green'); // 注意没有空格！
  // 符合条件的节点：
  // <div class="red green">...</div>
  // <div class="blue green red">...</div>
  ```

  

- 按属性查找：$('[ ...... ]')

  ```js
  var email = $('[name=email]'); // 找出<??? name="email">
  
  // 前缀查找：
  var icons = $('[name^=icon]'); // 找出所有name属性值以icon开头的DOM
  // 例如: name="icon-1", name="icon-2"
  
  // 后缀查找：
  var names = $('[name$=with]'); // 找出所有name属性值以with结尾的DOM
  // 例如: name="startswith", name="endswith"
  ```

- 组合查找

  ```js
  // 标签+属性
  var emailInput = $('input[name=email]'); // 不会找出<div name="email">

  // 标签+class
  var tr = $('tr.red'); // 找出<tr class="red ...">...</tr>
  
  ```
  
- 多项选择器：使用逗号”,"连接多个选择器

  ```js
  $('p,div'); // 把<p>和<div>都选出来
  $('p.red,p.green'); // 把<p class="red">和<p class="green">都选出来
  ```
#### 2.2 层级选择器

- 层级选择器：如果两个DOM元素具有层级关系，就可以用`$('ancestor descendant')`来选择，层级之间用**空格**隔开。可以选用多层。例如：

  ```js
  $('form.test p input'); // 在form表单选择被<p>包含的<input>
  ```

  

- 子选择器：$(' parent > child ')层级关系必须是父子关系（即直属子节点）。

- 过滤器：过滤器一般不单独使用，它通常附加在选择器上，帮助我们更精确地定位元素。

  ```js
  $('ul.lang li'); // 选出JavaScript、Python和Lua 3个节点
  
  $('ul.lang li:first-child'); // 仅选出JavaScript
  $('ul.lang li:last-child'); // 仅选出Lua
  $('ul.lang li:nth-child(2)'); // 选出第N个元素，N从1开始
  $('ul.lang li:nth-child(even)'); // 选出序号为偶数的元素
  $('ul.lang li:nth-child(odd)'); // 选出序号为奇数的元素
  ```

  

- 表单相关：    

  - `:input`：可以选择``，``，``和``；
  - `:file`：可以选择``，和`input[type=file]`一样；
  - `:checkbox`：可以选择复选框，和`input[type=checkbox]`一样；
  - `:radio`：可以选择单选框，和`input[type=radio]`一样；
  - `:focus`：可以选择当前输入焦点的元素，例如把光标放到一个``上，用`$('input:focus')`就可以选出；
  - `:checked`：选择当前勾上的单选框和复选框，用这个选择器可以立刻获得用户选择的项目，如`$('input[type=radio]:checked')`；
  - `:enabled`：可以选择可以正常输入的``、`` 等，也就是没有灰掉的输入；
  - `:disabled`：和`:enabled`正好相反，选择那些不能输入的。

```js
// 例如，选出可见的或隐藏的元素：
$('div:visible'); // 所有可见的div
$('div:hidden'); // 所有隐藏的div
```



#### 2.3 查找

```html
<!-- HTML结构 -->
<ul class="lang">
    <li class="js dy">JavaScript</li>
    <li class="dy">Python</li>
    <li id="swift">Swift</li>
    <li class="dy">Scheme</li>
    <li name="haskell">Haskell</li>
</ul>
```



- find()：对JQuery对象进行查找;

  ```js
  var ul = $('ul.lang'); // 获得<ul>
  var dy = ul.find('.dy'); // 获得JavaScript, Python, Scheme
  ```

  

- parent()

- next()

- prev()

#### 2.4 过滤

- filter()
- map()



### 3. 操作DOM

### 4. 事件

### 5.动画

### 6.拓展

### 7. AJAX



​	