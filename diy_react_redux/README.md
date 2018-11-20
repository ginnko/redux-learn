React除了状态提升，没有其他办法解决组件间状态共享的问题。

redux解决了共享状态以及修改共享状态的问题。

react-redux将context和store结合起来，这样的话每个组件既可以去context中获取store，从而获取状态，有不用担心它们乱改数据。

## 实现步骤

1. 直接结合store和context会导致出现大量重复的代码，组件也会因为和context耦合在一起导致复用性变差。

2. 使用高阶组件

每个组件需要的数据不同，所以在向connect函数传递组件的同时，还需要传入一个能够指引正确获取数据的mapStateToProps函数。

再传入一个mapDispatchToProps函数用来解决触发函数的问题。

3. Provider

最外层包一个Provider，用来盛context，这样context彻底从自定义组件中分离


## react-redux中最基本的两部分

1. Provider

2. connect

代码详见[此处](./react-redux.js)