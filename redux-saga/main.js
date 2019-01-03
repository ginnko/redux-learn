import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';

import Counter from './Counter'
import reducer from './reducers'
import rootSaga from './sagas';

// 通过工厂函数创建一个中间件
const sagaMiddleware = createSagaMiddleware();

// 关联store和中间件
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

// 启动saga
sagaMiddleware.run(rootSaga);

const action = type => store.dispatch({type})

/**
 * 注意下面这个函数中
 * INCREMENT_ASYNC部分
 * 教程里有下面这句话：
 * Note that unlike in redux-thunk, our component dispatches a plain object
 * action
 */
function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}  
    />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
