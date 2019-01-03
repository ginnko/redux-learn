import { delay } from 'redux-saga';
import { call, put, takeEvery, all } from 'redux-saga/effects';

export function* incrementAsync() {
  // yield delay(1000);
  // 不使用上面这种写法，而使用call的形式
  // 上面的形式返回的是一个Promise，无法进行测试
  // call类似put，会返回一个Effect，用来指挥中间件调用一个函数
  // 他们只简单的返回纯js对象
  // 使用call和put的方式后，中间件会来检查每一个yielded的Effect的类型，然后再决定如何
  // fulfill那个Effect，如果这个Effect的类型是 PUT ，中间件将给Store打一个action补丁，
  // 如果那个Effect类型是 CALL ，中间件将调用那个提供的函数。
  yield call(delay, 1000);// => { CALL: {fn: delay, args: [1000]}}
  yield put({ type: 'INCREMENT' });// => { PUT: {type: 'INCREMENT'} }
}


export function* helloSaga () {
  console.log('Hello Sagas!');
}

// watcher saga

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

// 一次启动saga的入口

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ]);
}

/**
 * 一些概念：
 * 
 * 1. delay：一个工具函数，会返回一个Promise对象，它将在某个特定毫秒时间后resolve，
 * 这个函数的作用是用来阻塞Generator
 * 
 * 2. saga:是一个Generator函数，向redux-saga的middlewareyield对象，产生的对象是由
 * 中间件解释的指令。
 * 
 * 当一个Promise对象被yield到middleware，middleware将暂停执行saga直到promise完成，
 * 上面的incrementAsync saga在delay函数返回的Promise对象被resolve前将被暂停执行。
 * 
 * 3. 执行put函数会返回一个Promise对象，这个put函数用来指示middleware去patch一个
 *  INCREMENT action
 * 
 * 4. takeEvery：redux-saga提供的帮助函数，用来监听 INCREMENT_ASYNC ACTION，每次都会
 * 运行 incrementAsync saga。
 */