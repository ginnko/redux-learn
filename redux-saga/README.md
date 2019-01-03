# redux-saga-beginner-tutorial
Companion Repo for [Redux/Redux-saga beginner tutorial](https://github.com/redux-saga/redux-saga/blob/master/docs/introduction/BeginnerTutorial.md)

# Instructions

Setup

```
// clone the repo
git clone https://github.com/redux-saga/redux-saga-beginner-tutorial.git

cd redux-saga-beginner-tutorial

npm install
```

Run the demo

```
npm start
```

Run tests

```
npm test
```
# summary

总结可以从四个方面来写：

1. redux-saga的一般用法
2. redux-saga中的重要概念

  - Effect

3. redux-saga的理念
4. redux-saga的重要api

  - call
  - put
  - takeEvery
  - takeLatest

# hard part need to learn

1. about yield

2. about saga


# memos

## Basic Concepts

#### Saga Helpers

1. takeEvery：允许同时启动多个`fetchData`实例，即便之前的fetch没有完成，也可以启动新的
fetch。
2. takeLatest：在任何时候仅允许一个`fetchDdata`运行，这个会是最新的`fetchData`任务。一个
新的`fetchData`任务启动了，如果先前的task没有完成，这个先前的任务就会自动终止。

#### Declarative Effects

1. Effects

在`redux-saga`中，使用`Generator`函数来操纵`Saga`。为了表达`Saga`的逻辑，
我们从Generator函数中yield纯js对象，称这些对象为`Effect`。这些对象中包含的信息由中间件进行
解释，可以把Effect视为对middleware的一些指示，用来执行一些操作（比如调用异步函数，向store中
dispatch一个action等）。

2. Generator函数的工作流程

简单插一句Generator函数的工作流程：在Generator函数中，`yield`关键字右侧的任何表达式被计算完
结果将被yield进caller中。

> The redux-saga middleware takes care of executing the function call and
> resuming the generator with the resolved response.

3. 适用于effect的几个函数

```js
import { cps, put, call, apply } from 'redux-saga/effects'
```
call和apply可以传入this的指向：

`yield call([obj, obj.method], arg1, arg2, ...)`

`yield apply(obj, obj.method, [arg1, arg2, ...])`

call、apply适用于返回promise对象的函数

cps适用于Node的函数

### dispatching actions

类似上面的

### Error handling

### A common abstraction: Effect

>To generalize, triggering  Side Effects from inside a Saga is always done by
>yielding some declarative Effect.(You can also yield Promise directly, but this
>will make testing difficult as we saw inthe first section.)

**What a saga does is actually compose all those Effects together to implement**
**the desired control flow. The simplest example is to sequence yielded Effects**
**by just putting the yields one after another. You can also use the familiar**
**control flow operators(if, while, for)to implement more sophisticated control**
**flows.**

## Advanced Concepts