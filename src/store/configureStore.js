import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import createRootReducer from "../reducers";

export const history = createHistory();

const persistConfig = {
  key: "root",
  storage
};

export function configureStoreTest(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middleWare = [thunk, reactRouterMiddleware];
  const mockStore = configureMockStore(middleWare);

  const store = mockStore(createRootReducer(history), initialState);

  return { store };
}

function configureStoreDev(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const logger = createLogger({
    collapsed: true
  });
  const middleWare = [reduxImmutableStateInvariant(), thunk, logger, reactRouterMiddleware];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const persistedReducer = persistReducer(persistConfig, createRootReducer(history));
  const store = createStore(
    persistedReducer, initialState, composeEnhancers(applyMiddleware(...middleWare))
  );
  const persistor = persistStore(store);

  return { store, persistor };
}

function configureStoreProd(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middleWare = [thunk, reactRouterMiddleware];

  const persistedReducer = persistReducer(persistConfig, createRootReducer(history));
  const store = createStore(persistedReducer, initialState, applyMiddleware(...middleWare));
  const persistor = persistStore(store);

  return { store, persistor };
}

const configureStore = process.env.NODE_ENV === "production" ? configureStoreProd : configureStoreDev;

export default configureStore;
