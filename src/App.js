import React from 'react';
import Main from './Main.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const reduxname = {
  dataname: ''
}

const ReducerName = (state = reduxname, action) => {
  switch (action.type) {
    case "Reduxname":
      state = {
        dataname: action.payload.dataname,
      }
      break;

    default:
  }
  return state;
}

const reduxroom = {
  roomid: ''
}

const ReducerRoom = (state = reduxroom, action) => {
  switch (action.type) {
    case "Reduxroom":
      state = {
        roomid: action.payload.roomid,
      }
      break;

    default:
  }
  return state;
}

const mylogger = (store) => (next) => (action) => {
  // console.log(action)
  next(action)
}

const store = createStore(combineReducers({ reduxname: ReducerName, reduxroom: ReducerRoom }), {}, applyMiddleware(mylogger))
store.subscribe(
  () => {
    // console.log("Data ", store.getState())
  }
)

const AppWithRouter = () => (
  <Provider store={store}>

    <Main />

  </Provider>
)

export default class App extends React.Component {
  render() {
    return (
      <AppWithRouter />
    )
  }
}
