[toc]

## 类之间的关系

https://design-patterns.readthedocs.io/zh_CN/latest/read_uml.html#generalization

### 泛化关系(generalization)

(泛化：由具体的、个别的扩大为一般的。如把三角形、长方形泛化为形状。)

用**一条带空心箭头**的直接表示；如下图表示（A继承自B）：

![_images/uml_generalization.jpg](https://design-patterns.readthedocs.io/zh_CN/latest/_images/uml_generalization.jpg)

注：最终代码中，泛化关系表现为继承非抽象类；

### 实现关系(realize)

用一条带空心箭头的虚线表示：



### 聚合关系(aggregation)

用一条带空心菱形箭头的直线表示：

如下图表示A聚合到B上，或者说B由A组成；

![_images/uml_aggregation.jpg](https://design-patterns.readthedocs.io/zh_CN/latest/_images/uml_aggregation.jpg)

聚合关系用于表示实体对象之间的关系，表示整体由部分构成的语义；例如一个部门由多个员工组成；

与组合关系不同的是，整体和部分不是强依赖的，即使整体不存在了，部分仍然存在。

### 组合关系(composition)

用一条带实心菱形箭头直线表示

如下图表示A组成B，或者B由A组成；

![_images/uml_composition.jpg](https://design-patterns.readthedocs.io/zh_CN/latest/_images/uml_composition.jpg)

但组合关系是一种强依赖的特殊聚合关系，如果整体不存在了，则部分也不存在了；例如， 公司不存在了，部门也将不存在了；

### 关联关系(association)

用一条直线表示 或 用一条带箭头的实线表示 ；

关联关系默认不强调方向，表示对象间相互知道；如果特别强调方向，如下图，表示A知道B，但 B不知道A；

![_images/uml_association.jpg](https://design-patterns.readthedocs.io/zh_CN/latest/_images/uml_association.jpg)

### 依赖关系(dependency)

用一条带箭头的虚线表示；

如下图表示A依赖于B；他描述一个对象在运行期间会用到另一个对象的关系；

![_images/uml_dependency.jpg](https://design-patterns.readthedocs.io/zh_CN/latest/_images/uml_dependency.jpg)

## 时序图

https://blog.51cto.com/smartlife/284874

https://www.cnblogs.com/wolf-sun/p/UML-Sequence-diagram.html

​    时序图（Sequence Diagram）是显示对象之间交互的图，这些对象是按时间顺序排列的。顺序图中显示的是参与交互的对象及其对象之间消息交互的顺序。时序图中包括的建模元素主要有：对象（Actor）、生命线（Lifeline）、控制焦点（Focus of control）、消息（Message）等等。

消息从源对象指向目标对象。消息一旦发送便将控制从源对象转移到目标对象。

## 面向对象设计的solid原则

https://www.cnblogs.com/shanyou/archive/2009/09/21/1570716.html

| **RP**  | [The Single Responsibility Principle](http://www.objectmentor.com/resources/articles/srp.pdf) | 单一责任原则 |
| ------- | ------------------------------------------------------------ | ------------ |
| **OCP** | [The Open Closed Principle](http://www.objectmentor.com/resources/articles/ocp.pdf) | 开放封闭原则 |
| **LSP** | [The Liskov Substitution Principle](http://www.objectmentor.com/resources/articles/lsp.pdf) | 里氏替换原则 |
| **DIP** | [The Dependency Inversion Principle](http://www.objectmentor.com/resources/articles/dip.pdf) | 依赖倒置原则 |
| **ISP** | [The Interface Segregation Principle](http://www.objectmentor.com/resources/articles/isp.pdf) | 接口分离原则 |

