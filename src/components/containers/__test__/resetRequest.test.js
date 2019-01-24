import React from "react";
import { mount } from "enzyme";
import ResetRequestPage from "../resetRequest";

describe("ResetRequest Component", () => {
  let resetComponent = "";

  beforeEach(() => {
    resetComponent = mount(<ResetRequestPage />);
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
