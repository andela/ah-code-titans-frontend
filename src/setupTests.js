/* eslint-disable import/prefer-default-export */
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore, { configureStoreTest } from "./store/configureStore";
import initialState from "./store/initialState";

configure({ adapter: new Adapter() });

export function setup(Component, state = initialState) {
  const { store } = configureStore(state);
  const enzymeWrapper = mount(
    <Provider store={store}>
      <MemoryRouter>{Component}</MemoryRouter>
    </Provider>
  );

  return {
    enzymeWrapper,
    store
  };
}
