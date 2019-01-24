
import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";

export default function setupBase(setupStore, setupPersistor, setupHistory, Component) {
  return (
    <Provider store={setupStore}>
      <PersistGate loading={null} persistor={setupPersistor}>
        <ConnectedRouter history={setupHistory}>
          {Component}
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}
