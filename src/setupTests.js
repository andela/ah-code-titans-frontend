/* eslint-disable import/prefer-default-export */
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { configureStoreTest } from "./store/configureStore";
import initialState from "./store/initialState";

configure({ adapter: new Adapter() });

// eslint-disable-next-line func-names
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => { }
  };
};

// eslint-disable-next-line func-names
window.requestAnimationFrame = window.requestAnimationFrame || function (callback) {
  setTimeout(callback, 0);
};

export function setup(Component, state = {}) {
  const { store } = configureStoreTest({ ...initialState, ...state });
  const enzymeWrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        {Component}
      </MemoryRouter>
    </Provider>
  );

  return {
    enzymeWrapper,
    store
  };
}
