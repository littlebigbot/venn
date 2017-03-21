import React from 'react'
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
// import createSagaMiddleware from 'redux-saga'
import Root from './components/Root'
import rootReducer from './reducers'
import routes from './routes';
import createHistory from 'history/createHashHistory'

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

// export const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  //applyMiddleware(sagaMiddleware)
  applyMiddleware(thunk),
  applyMiddleware(historyMiddleware)
);


window.store = store;

render(
  <Root store={store} history={history} routes={routes} />,
  document.getElementById('root')
)
