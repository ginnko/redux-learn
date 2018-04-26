  ### **知识点：**  
  - action： 是一个必须包含一个type属性的对象，表示后来发生了什么，用来更新state的信息来源；
  - actionCreator
  - ui-state和data-state要分开
  - reducer： 是一个纯函数，可以表示为如下形式
    `(previousState, action) => newState`
  - reducer composition： 是将整个state按属性拆开单个reducer函数。每个state参数各不相同
  - conbineReducers： 感觉使用这个函数写法上有严格要求--slice reducer的命名必须和对象state中的属性名相同，传入conbineReducers中的对象的属性名也要和slice reducer的名称相同，才会以想要的方式执行。
  - store: 
  - data lifecycle: 