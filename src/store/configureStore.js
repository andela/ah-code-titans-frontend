import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "connected-react-router";

import creactRootReducer from "../reducers";

export const history = createHistory();

function configureStoreDev(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middleWare = [
    reduxImmutableStateInvariant(),
    thunk,
    logger,
    reactRouterMiddleware
  ];

  return createStore(
    creactRootReducer(history),
    initialState,
    applyMiddleware(...middleWare)
  );
}

function configureStoreProd(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middleWare = [
    thunk,
    reactRouterMiddleware
  ];

  return createStore(
    creactRootReducer(history),
    initialState,
    applyMiddleware(...middleWare)
  );
}

const configureStore = process.env.NODE_ENV === "production"
  ? configureStoreProd
  : configureStoreDev;

export default configureStore;
