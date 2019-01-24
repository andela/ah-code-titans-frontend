/* eslint-disable import/prefer-default-export */
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

// import setupBase from "./setupBase";
import configureStoreDev, { history } from "./store/configureStore";
import initialState from "./store/initialState";

configure({ adapter: new Adapter() });

export function setup(Component, state = initialState) {
  const { store } = configureStoreDev(state);

  const enzymeWrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {Component}
      </ConnectedRouter>
    </Provider>
  );

  return {
    enzymeWrapper,
    store
  };
}
