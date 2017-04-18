import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
// import createSagaMiddleware from 'redux-saga'
import Root from './components/Root'
import rootReducer from './reducers'
import routes from './routes';
import createHistory from 'history/createHashHistory'
import { AppContainer } from 'react-hot-loader'
import createLogger from 'redux-logger'
import './global.css';

const logger = createLogger();
const history = createHistory();
const historyMiddleware = routerMiddleware(history);

// export const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(logger),
  //applyMiddleware(sagaMiddleware)
  applyMiddleware(thunk),
  applyMiddleware(historyMiddleware),
);


window.store = store;

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} routes={routes} />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root);

if (module.hot) {
  module.hot.accept('./components/Root', () => { render(Root) })
}
