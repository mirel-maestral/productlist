import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer from './rootReducer';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(routerMiddleware(history), thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);