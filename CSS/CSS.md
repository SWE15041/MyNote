[toc]

## 一、css 概要

1. CSS 指层叠样式表 (**C**ascading **S**tyle **S**heets)
2. 为了**解决内容与表现分离的问题**
3. 分为内部样式表，外部样式表，嵌套样式表

## 二、语法
1. 基本语法：
```css
	选择器:{
          属性:值;
          属性：值;
          ...}
```
- 选择器：ID选择器、class选择器、HTML标签选择器、派生选择器.....
2. 实例：
- 内联样式表：定义在在`<style>`标签内；
```html
<style>
p{
	color:red;
	text-align:center;
} 
</style>
```
- 外联样式表：定义在以css为拓展名的文件内，不需要使用`<style>`标签元素作为根元素；在HTML中通过`<link>`标签引用外部样式表；
```html
<link rel="stylesheet" type="text/css" href="css/myCss.css">
```
```css
p{
	color:red;
	text-align:center;
}
```
- 嵌套样式表：定义在html标签style属性的样式
```
<p style="background-color: blue"></p>

```
## 三、CSS注释
1. 以 "/*" 开始, 以 "*/" 结束；
```css
/*这是个注释*/
p{
	color:red;
	text-align:center;
} 
```
## 四、CSS选择器
1. ID选择器
- id 选择器可以为标有特定 id 的 HTML 元素指定**特定**的样式。
- id 选择器以 "#" 来定义
- 示例
```html
<p id="para1">Hello World!</p>
```
```css
#para1
{
    text-align:center;
    color:red;
}
```
2. class选择器
- class 选择器用于描述一组元素的样式
- class可以在多个元素中使用
- 类选择器以一个点"."号显示
- 示例
    - class选择器

```html
<h1 class="center">标题居中</h1>
<p class="center">段落居中。</p> 
```
```css
.center
{
	text-align:center;
}	
```
3. 元素选择器
   - 语法：[元素]:{}
   - 示例:

```html
<h1>This is a <em>important</em> heading</h1>
```
```css
h1{color:red;}
```
4. 属性选择器

  - 语法：[属性名]:{}

  - 定义：对带有指定属性的 HTML 元素设置样式。

  - 示例：

    ```css
    [title]
    {
    color:red;
    }
    ```

    ```html
    <h2 title="Hello world">Hello world</h2>
    <a title="baidu" href="http://www.b aidu.com">www.baidu.com</a>
    ```

    

5. 派生选择器
  定义： 通过依据元素在其位置的上下文关系来定义样式，你可以使标记更加简洁。  
  分类如下：  
- 后代选择器（包含选择器）
    * 用空格拼接
    * 后代包含所有子孙节点，可以是元素、ID、class
    *  示例1：语法（元素 元素 :{} ）
    ```html
    	<p>This is a <em>important</em> paragraph.</p>
    	<p>This is a <label> hhh <em>important</em> </label>paragraph.</p>
    ```
    ```css
    	p em {color:red;}
    ```
    * 示例2：语法（元素#id : {}）
    ```html
    	/*元素内的ID*/
    	<p>This is a <label id="a">important</label> paragraph.</p>
		<p>This is a <label id="b">important</label> paragraph.</p>
   ```
    ```css
    	label#a{color:green;}
    ```
    * 示例3：语法（元素.class : {}）
    ```html
     /*元素内的class*/
   	<p>This is a <label class="a">important</label> paragraph.</p>
		<p>This is a <label class="b">important</label> paragraph.</p>
    ```
    ```css
    	label.a{color:blue;}
    ```
   
- 子元素选择器
    * 语法：元素>元素:{}  (其中大于号">"是子结合符)
    * 示例1
    ```html
    <h1>This is <strong>very</strong> <strong>very</strong> important.</h1>
	<h1>This is <em>really <strong>very</strong></em> important.</h1>
    ```
    ```css
    h1 > strong {color:red;}
    ```
    * 示例2：结合后代选择器和子选择器
    ```
    table.company td > p
    ```
    
- 相邻兄弟选择器

    - 定义： **紧接** 在另一个元素后的元素，而且二者有相同的父元素

    - 语法：前元素+后元素:{}

    - 示例： p标签包含的段落渲染成红色

      ```html
      <div id="a"> 
      	<label> start</label>
      	<p>This is paragraph.</p>	
      	<label>end</label>
      </div>
      ```

      ```css
      label + p {color:red;}
      ```

      

- 伪类选择器

    - 定义：**伪类**用于向某些选择器添加特殊的效果。

    - 语法 

      * 单独使用

      ```css
      selector : pseudo-class {property: value}
      ```

      * 混合使用

      ```css
      selector.class : pseudo-class {property: value}
      ```

        

    - 示例1：锚伪类

      ```
      a:link {color: #FF0000}		/* 未访问的链接 */
      a:visited {color: #00FF00}	/* 已访问的链接 */
      a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
      a:active {color: #0000FF}	/* 选定的链接 */
      ```

      **注：**

      a. 在 CSS 定义中，a:hover 必须被置于 a:link 和 a:visited 之后，才是有效的。

      b. 在 CSS 定义中，a:active 必须被置于 a:hover 之后，才是有效的。

    - 示例2：first-child 伪类

      ```html
      <ul>
      <li>Intert Key</li>
      <li>Turn key <strong>clockwise</strong></li>
      <li>Push accelerator</li>
      </ul>
      
      ```

      ```css
      li:first-child {color:blue;text-transform:uppercase;}
      
      ```

      

    - 示例3：两个text都被渲染

      ```html
      <p>some <i>text</i>. some <i>text</i>.</p>
      <p>some <i>text</i>. some <i>text</i>.</p>
      ```

      ```css
      p > i:first-child {
        font-weight:bold;
        } 
      ```

    - 示例4 ：第一个text 被渲染

      ```html
      <p>some <i>text</i>. some <i>text</i>.</p>
      <p>some <i>text</i>. some <i>text</i>.</p>
      ```

      ```css
      p:first-child i {
        color:blue;
        } 
      ```

    - 示例5：**:lang** 伪类允许您为不同的语言定义特殊的规则。

      ```html
      <p>一些文本 <q lang="no">段落中的引用</q> 一些文本。</p>
      ```

      ```css
      q:lang(no)
      {
      quotes: "~" "~"
      }
      ```

      



- 伪元素 选择器

  - 定义：**CSS 伪元素用于向某些选择器设置特殊效果。**

  - 语法： 

    ```css
    selector:pseudo-element {property:value;}
    ```

    ```css
    selector.class:pseudo-element {property:value;}
    ```

  - 常见：
    -  :first-line 伪元素 (用于向文本的首行设置特殊样式。)
    -  :first-letter 伪元素 (用于向文本的首字母设置特殊样式)
    -  :before 伪元素 (在元素的内容前面插入新内容。)
    -  :after 伪元素 (在元素的内容之后插入新内容。)

  - 
6. 通用选择器：*

**注：** 区别伪类和伪元素：

- 伪类：用于向某些选择器添加特殊的效果。例如a元素的:hover, :active等

- 伪元素：用于将特殊的效果添加到某些选择器(标签)。例如：用::before和::after

  

## 五、样式表创建

1. 样式表分类：

   - 外部样式表
   - 内部样式表
   - 内联样式

2. 样式表的使用

   - 外部样式表的引用

     ```html
     <head>
     <link rel="stylesheet" type="text/css" href="mystyle.css">
     </head>
     ```

     mystyle.css：

     ```css
     hr {color:sienna;}
     p {margin-left:20px;}
     ```

     

   - 内部样式表

     ```html
     <head>
     <style>
     hr {color:sienna;}
     p {margin-left:20px;}
     </style>
     </head>
     ```

     

   - 内联样式

     ```css
     <p style="color:sienna;margin-left:20px">这是一个段落。</p>
     ```

     

3. 多重样式（样式的继承）

4. 样式优先级

   - **（内联样式）Inline style > （内部样式）Internal style sheet >（外部样式）External style sheet > 浏览器默认样式 **

   - **注** ：如果外部样式放在内部样式的后面，则外部样式将覆盖内部样式。
   
   -  !important 规则例外
   - 具体样式优先级顺序：逐级增加
   		-  通用选择器（*）
   		-  元素(类型)选择器
   		-  类选择器
   		-  属性选择器
   		-  伪类
   		-  ID 选择器
   		-  内联样式  

- 
  

## 六 、背景
css属性：
- background-color
- background-image
- background-repeat
- background-attachment
- background-position
1. 背景相关属性
    1.1 背景颜色

       ```css
       body 
       {
       	background-color:#cccccc;
       }
       ```

       

    1.2 背景图像

      ```css
      body {
      			  background-color: #cccccc;
              background-image: url('img/heng.jpg');  
          }
      ```

      **注：**默认情况下 background-image 属性会在页面的水平或者垂直方向平铺。 

    1.3 背景图像- 水平或垂直平铺

      ```css
          body {
        		background-color: #cccccc;
            background-image: url('img/heng.jpg');
      		  background-repeat: no-repeat;
    		  }
      ```

    **属性值：**

    ```
    - no-repeat: 不平铺
    - repeat-x : 水平平铺
    - repeat-y : 垂直平铺
    - repeat : 水平垂直都平铺
    ```

    1.4 背景图像- 设置滚动

       - background-attachment：设置背景图像是否固定或者随着页面的其余部分滚动。继承：no.

       - 属性值：

         ```
         * scroll： 背景图片随着页面的滚动而滚动，**默认值**。
         * fixed:  背景图片不会随着页面的滚动而滚动。
         * local：背景图片会随着元素内容的滚动而滚动。
         * initial: 设置该属性的默认值。
         * inherit：指定 background-attachment 的设置应该从父元素继承。
         ```
    
         
    
    1.5	背景图像- 设置定位
    
    - background-position 属性:改变图像在背景中的位置:
    
    - 示例：
    
      ```css
       body {
              background-color: #cccccc;
              background-image: url('img/heng.jpg');
              background-repeat: no-repeat;
              background-position:right top;
      }
      ```
    
      
    


2. 背景- 简写属性
```css
body {background:#ffffff url('img_tree.png') no-repeat right top;}
```



## 七、文本

1. 颜色：color

   - 十六进制值 - 如: **＃FF0000**

   - 一个RGB值 - 如: **RGB(255,0,0)**

   - 颜色的名称 - 如: **red**

   - 示例

     ```css
     body {color:red;}
     h1 {color:#00ff00;}
     h2 {color:rgb(255,0,0);}
     ```

     

2. 对齐方式：text-align

   - 示例：

     ```css
     h1 {text-align:center;}
     p.date {text-align:right;}
     p.main {text-align:justify;}
     ```

     

3. 文本修饰: text-decoration

   - 示例

     ```css
     a {text-decoration:none;}
     h1 {text-decoration:overline;}
     h2 {text-decoration:line-through;}
     h3 {text-decoration:underline;}
     ```

     

4. 文本转换

   - 示例

     ```css
     p.uppercase {text-transform:uppercase;}
     p.lowercase {text-transform:lowercase;}
     p.capitalize {text-transform:capitalize;}
     ```

     

5. 文本缩进

   - 示例

     ```css
     p {text-indent:50px;}
     ```

6. 等

## 八、字体

1. 字型：Serif、Sans-serif、Monospace

2. 字体系列：font-family

3. 字体样式：正体、文本斜体、文字倾斜

   ```css
   p.normal {font-style:normal;} /*正体*/
   p.italic {font-style:italic;}/*文本斜体*/
   p.oblique {font-style:oblique;}/*文字倾斜*/
   ```

   

## 九、链接

```css
<style>
a:link {color:#000000;}      /* 未访问链接*/
a:visited {color:#00FF00;}  /* 已访问链接 */
a:hover {color:#FF00FF;}  /* 鼠标移动到链接上 */
a:active {color:#0000FF;}  /* 鼠标点击时 */
</style>
```

## 十、列表样式

1. 列表分类：

   - 有序列表：ol
   - 无序列表:  ul

2. 列表项标记：

   - 普通列表项标记：list-style-type
     - none : 无标记
     - disc : 实心圆  **(默认)**
     - square ：实心方块
     - decimal : 数字
     - lower-roman : 小写罗马数字
     - upper-roman ： 大写罗马数字
     - lower-alpha：小写英文字母
     - .......
   - 图像列表项标记 ： list-style-image

3. 列表位置：  list-style-position

   - inside： 列表项标记放置在文本以内，且环绕文本根据标记对齐。
   - outside ：默认值。保持标记位于文本的左侧。且环绕文本不根据标记对齐。
   - inherit ：继承父级属性值

4. 简写列表样式：

   ```css
   li {list-style : url(example.gif) square inside}
   ```

5. 示例

   - 示例1：普通列表标记 (list-style-type)

   ```css
   ul.a {list-style-type: circle;}
   ul.b {list-style-type: square;}
    
   ol.c {list-style-type: upper-roman;}
   ol.d {list-style-type: lower-alpha;}
   ```

   - 示例2：图像列表标记 (list-style-image)

     ```css
     ul {
         list-style-image: url('sqpurple.gif');
     }
     ```

   - 示例3：列表项位置（  list-style-position）

     ```css
     ul{
       list-style-position:inside;
      }
     ```

     

## 十一、表格

1. 



## 十二、模型

1. 盒子模型

![image-20200302160545591](/Users/lyn/Library/Application Support/typora-user-images/image-20200302160545591.png)

解析：

- element：元素框，元素实际的内容。

- padding：内边距，用于呈现元素背景。

- border：边框，内边距的边缘。

- margin：外边距，边框以外，默认透明。

  **注：** 背景应用于由内容和内边距、边框组成的区域。 

2. 边框

   - 边框样式：

     - 多种样式：border-style（上右下左）

     - 单边样式：

        ```
       border-top-style
       border-right-style
       border-bottom-style
       border-left-style
       ```

       

   - 边框宽度

     - 多种宽度：border-width

     - 单边宽度：

       ```
       border-top-width
       border-right-width
       border-bottom-width
       border-left-width
       ```

       

   - 边框颜色

     - 多种颜色:  border-color

     - 单边颜色：

       ```
       border-top-color
       border-right-color
       border-bottom-color
       border-left-color
       ```

       

   - 统一给边框的某一个方位设置样式

     - 上边框：border-top

     - 右边框：border-right

     - 左边框：border-left

     - 下边框：border-bottom

       

     ​	

   - 示例：

     ```css
     p{
       border-style:dotted solid double dashed; 
     }
     div{
       border-style:dotted;
     }
     ```

     

   - 常见值

     - 1.border-style

     ![image-20200302161728043](/Users/lyn/Library/Application Support/typora-user-images/image-20200302161728043.png)

   - 常见属性

     ![image-20200303102652501](/Users/lyn/Library/Application Support/typora-user-images/image-20200303102652501.png)

## 十三、轮廓

1. 轮廓定义

   - 定义：是绘制于元素周围的一条线，位于边框边缘的外围。

     

2. 分类

   - 简单属性：outline
   - 轮廓颜色样式：
   - 轮廓样式：
   - 轮廓宽度：

3. 示例

   ```css
   p{
     outline:#00FF00 dotted thick;
    }
   ```

   ```css
   p{
     outline-color:#00ff00;
     outline-style:dotted;
     outline-width:5px;
     }
   ```

   

   

## 十四、定位

1. 框：

   - 定义：块级元素对应的块框，行级元素对应行内框，都称为框；使用 display属性设置显示的框类型；

2. 定位机制：

   - 三种基本定位机制：普通流，浮动，绝对定位；（默认普通流）

   - 边距计算：

     - 块级框从上到下一个接一个地排列，框之间的垂直距离是由框的垂直外边距计算出来。
     - 行内框在一行中水平布置。可以使用水平内边距、边框和外边距调整它们的间距。

   - 定位：position的属性值

     - static：

       ```
       HTML 元素的默认值，即没有定位，遵循正常的文档流对象。
       静态定位的元素不会受到 top, bottom, left, right影响。
       ```

       

     - relative：

       ```
       相对定位元素的定位是相对其正常位置。
       ```

       

     - absolute：

       ```
       绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于<html>。
       不占据空间。
       ```

       

     - fixed：

       ```
       元素的位置相对于浏览器窗口是固定位置。
       即使窗口是滚动的它也不会移动：
       不占据空间。
       ```

     - sticky
     
       ```
       基于用户的滚动位置来定位,在 position:relative 与 position:fixed 定位之间切换。
       它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。
       元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。
       特定阈值即指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。
       ```
     
       ![image-20200304150818402](/Users/lyn/Library/Application Support/typora-user-images/image-20200304150818402.png)
     
    - 元素的堆叠顺序： z-index

## 十五、CSS布局 overflow

1. overflow ：用于控制内容溢出元素框时在对应的元素区间内添加滚动条。

2. 属性值：

   ![image-20200305120929610](/Users/lyn/Library/Application Support/typora-user-images/image-20200305120929610.png)

3. 示例：

   ```html
   <div id="overflowTest">
   <p>这里的文本内容会溢出元素框。</p>
   <p>这里的文本内容会溢出元素框。</p>
   <p>这里的文本内容会溢出元素框。</p>
   </div>
   ```

   

   ```css
   div {
       background-color: #eee;
       width: 200px;
       height: 50px;
       border: 1px dotted black;
       overflow: inherit;
   }
   ```

## 十六、浮动

1. 设置浮动

2. 清除浮动

   - clear 属性：

   - 值：

     <img src="/Users/lyn/Library/Application Support/typora-user-images/image-20200305175857278.png" alt="image-20200305175857278" style="zoom:50%;" />

3. 示例

   ```css
   img{
   	float:left;
   }
   p.clear{
   	clear:both;
   }
   ```

   

   ```html
   <img src="heng.gif" width="95" height="84" />
   <p>This is some text. This is some text. This is some text. This is some text. This is some text. This is some text.</p>
   <p class="clear">This is also some text. This is also some text. This is also some text. This is also some text. This is also some text. This is also some text.</p>
   
   ```

   