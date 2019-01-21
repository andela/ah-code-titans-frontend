/* eslint-disable import/prefer-default-export */
import React from "react";
import { render } from "react-dom";
import "semantic-ui-css/semantic.min.css";
// delays the rendering of your app's UI until your
// persisted state has been retrieved and saved to redux
import App from "./components/App";
import configureStore, { history } from "./store/configureStore";
import initialState from "./store/initialState";
import setupBase from "./setupBase";

const { store, persistor } = configureStore(initialState);

render(
  setupBase(store, persistor, history, <App />),
  document.getElementById("root")
);
