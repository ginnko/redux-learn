/**
 * Reducers specify how the application's state changes in response to 
 * actions sent to the store. Remember that actions only describe the 
 * fact that something happened, but don't describe how the application's 
 * state changes.
 */




import { combineReducers } from 'redux';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions';


const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}



/**
 * 这个函数在redux中被称为reducer composition
 * @param {array} state 
 * @param {string} action 
 */

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,//...操作符不仅能解构对象，还能解构数组
        {
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });
    default:
      return state;
  }
}


/**
 * 感觉使用combineReducers这个函数是要有条件的
 * 就是其中的slice reducer的命名必须和对象state中的
 * 属性名相同，才会以想要的形式执行
 */
const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;















/**
 * 上面这三个reducer传入的参数虽然都包含state，
 * 但state却各不相同
 * 只针对自己单一要处理的state
 * 也就是说reducer composition是将每个state单独分开处理的技术
 */



/*
不使用combineReducers函数的写法

function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  };
}
*/



 /*
不分开的写法

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      });
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo;
        })
      });
    default:
      return state;
  }
}
*/