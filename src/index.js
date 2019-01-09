import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import App from "./components/app";
import configureStore, { history } from "./store/configureStore";
import initialState from "./store/initialState";

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
