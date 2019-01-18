import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "../reducers";

export const history = createHistory();

function configureStoreDev(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const logger = createLogger({
    collapsed: true
  });
  const middleWare = [reduxImmutableStateInvariant(), thunk, logger, reactRouterMiddleware];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  return createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middleWare))
  );
}

function configureStoreProd(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middleWare = [thunk, reactRouterMiddleware];

  return createStore(createRootReducer(history), initialState, applyMiddleware(...middleWare));
}

const configureStore = process.env.NODE_ENV === "production" ? configureStoreProd : configureStoreDev;

export default configureStore;
