import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ResetRequestPage from "../resetRequest";

const mockStore = configureMockStore();
const store = mockStore({});

describe("ResetRequest Component", () => {
  let resetComponent = "";

  beforeEach(() => {
    resetComponent = mount(
      <Provider store={store}>
        <ResetRequestPage />
      </Provider>
    );
  });

  afterEach(() => {
    resetComponent.unmount();
  });

  it("It should open the modal", () => {
    const formText = resetComponent.find(".auth__requestReset div.ui.header");
    expect(formText.first().text()).toEqual("Request password reset");
  });

  it("It should contain a send icon", () => {
    const sendIcon = resetComponent.find(".auth__requestReset div.ui.header");
    expect(sendIcon.find("i.send.icon").exists()).toEqual(true);
  });

  it("It should contain an input field", () => {
    const input = resetComponent.find(".auth__requestReset #email");
    expect(input.exists()).toEqual(true);
  });

  it("It should contain a button", () => {
    const button = resetComponent.find(".auth__requestReset .requestReset__sendBtn");
    expect(button.at(0).text()).toEqual("Send request");
  });
});
