### **问题： **
- 说实话啊对state是怎么传入和更新的这个过程很混乱啊。。。
- connect（）这个函数不一般。。。


### **知识点：**  
- action： 是一个必须包含一个type属性的对象，表示后来发生了什么，用来更新state的信息来源；
- actionCreator
- ui-state和data-state要分开
- reducer： 是一个纯函数，可以表示为如下形式
  `(previousState, action) => newState`
- reducer composition： 是将整个state按属性拆开单个reducer函数。每个state参数各不相同
- conbineReducers： 感觉使用这个函数写法上有严格要求--slice reducer的命名必须和对象state中的属性名相同，传入conbineReducers中的对象的属性名也要和slice reducer的名称相同，才会以想要的方式执行。

- store: 
  1. store.getState(): 从Redux store中取回当前state；
  2. store.dispatch(): dispatch actions 来改变应用的state；
  3. store.subscribe(): 给redux store注册一个回调函数，每当dispatch an action 就调用一下这个函数。**参数是回调函数**
- data lifecycle: 

- createStore()函数
  ```
    const createStore = (reducer) => {
      let state;
      let listeners = [];
      const getState = () => state;

      const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
      };

      const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
          listeners = listeners.filter(l => l !== listener);
        };
      };

      dispatch({});

      return {getState, dispatch, subscribe};
    };
  ```
  *分解完感觉好理解了很多啊*

- 不改变原始数组的方法
  1. 添加
    ```
      return [...list, 0];
    ```
  2. 删除
    ```
      return [
        ...list.slice(0, index),
        ...list.slice(index+1)
      ];
    ```
  3. 改变某个值
    ```
      return [
        ...list.slice(0, index),
        list[index]++,
        ...list.slice(index + 1)
      ];
    ```

- combineReducers()函数
  ```
    const combineReducers = reducers => {
      return (state = {}, action) => {
        return Object.keys(reducers).reduce(
          (nextState, key) => {
            nextState[key] = reducers[key] (
              state[key],
              action
            );
            return nextState;
          },
          {}
        );
      };
    };
  ```
  *关于reduce函数的说明：*
    1. reduce函数是定义在Array.prototype上的，Object.keys(reducers)返回一个由键值组成的数组；
    2. 回调函数是一个分别处理reducer的函数，其中nextState表示当前值，初始值是一个空对象{},这个在reduce函数的第二个参数已有定义
    3. 回调函数中完成的功能就是执行每一个对应键值的reducer然后作为属性添加进nextState这个对象中
    4. 最后返回这个对象
- connect()
目前感觉这个函数在内部已经负责处理调用`store.getState()`, `store.subscribe()`。
  1. 如果向这个函数正常传入参数，貌似会向store订阅；
  2. 如果第一个参数传入的是假值，比如null，那么将不会订阅store，也就是将要参与的组件不会用到store中的state；
  3. 如果只想使用dispatch，此时第二个参数可以传入假值，比如null；
  4. 如果`AddTodo = connect()(AddTodo)`这样调用connect，就会同时产生上述2&3的情况。