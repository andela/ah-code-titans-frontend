/* eslint-disable import/prefer-default-export */
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";

import App from "./components/App";
import { history } from "./store/configureStore";
import { store, persistor } from "./store";

import "semantic-ui-css/semantic.min.css";

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
