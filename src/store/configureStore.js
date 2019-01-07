import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import rootReducer from "../reducers";

function configureStoreDev(initialState) {
  const middleWare = [thunk, logger, reduxImmutableStateInvariant()];

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleWare)
  );
}

function configureStoreProd(initialState) {
  const middleWare = [thunk];

  return createStore(rootReducer, initialState, applyMiddleware(...middleWare));
}

const configureStore = process.env.NODE_ENV === "production"
  ? configureStoreProd
  : configureStoreDev;

export default configureStore;
