// 自定义createStore函数

function createStore(reducer) {
  let state = null;
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  dispatch({});
  return {subscribe, getState, dispatch};
}

const reducer = (state, action) => {
  if (state === null) {
    return {
      title: {
        text: '前端面试',
        color: 'green'
      },
      content: {
        text: '手写redux',
        color: 'green'
      }
    }
  }
  switch(action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      };
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      };
    default:
      return state;
  }
};

// 使用

function renderApp(newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return;
  renderTitle(newAppState.title, oldAppState.title);
  renderContent(newAppState.content, oldAppState.content);
}

function renderTitle(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return;
  const titleDOM = document.getElementById('title');
  titleDOM.innerHTML = newTitle.text;
  titleDOM.style.color = newTitle.color;
}

function renderContent(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return;
  const contentDOM = document.getElementById('content');
  contentDOM.innerHTML = newContent.text;
  contentDOM.style.color = newContent.color;
}

const store = createStore(reducer);
let oldState = store.getState();

store.subscribe(() => {
  const newState = store.getState();
  renderApp(newState, oldState);
  oldState = newState;
});

renderApp(store.getState());
store.dispatch({ type: '', text: ''});
store.dispatch({type: '', text: ''});