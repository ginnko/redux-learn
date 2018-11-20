教程：[点击这里](http://huziketang.mangojuice.top/books/react/lesson30)

## 预热

1. 高阶组件

  高阶组件是个函数，是为了代码复用，内部的包装组件和被包装组件之间通过 props 传递数据。使用了 **装饰者模式**。

2. context

  - root组件中

    1. childContextTypes：提供context的声明和验证
    2. getChildContext：这个方法返回的对象就是context

  - 子组件

    1. congtextTypes
    2. this.context.xxx

## 实现步骤

1. 确定修改共享数据的方式

`组件间需要共享数据`和`数据可能被任意修改导致不可预料的结果`

合理的修改数据的方式： **通过固定方式显示修改**

![dispatch](./images/dispatch.png)

`dispatch`的存在使得所有想要修改共享数据的企图只能通过一条路径进行，使得管理和debugger变得容易。

2. 抽象出来一个createStore函数用来制造store，包含getState和dispatch用来在外部操作。

3. 加入订阅者模式，通过store.subscribe订阅数据修改事件，每次数据更新的时候自动重新渲染视图。

4. 引入共享结构的对象解决渲染的性能问题


## diy-Redux

代码详见[此处](./redux.js);