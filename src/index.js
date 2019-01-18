import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { ConnectedRouter } from "connected-react-router";
// delays the rendering of your app's UI until your
// persisted state has been retrieved and saved to redux
import { PersistGate } from "redux-persist/integration/react";
import App from "./components/App";
import configureStore, { history } from "./store/configureStore";
import initialState from "./store/initialState";

const { store, persistor } = configureStore(initialState);

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
