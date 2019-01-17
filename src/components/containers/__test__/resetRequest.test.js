import React from "react";
import { mount } from "enzyme";
import ResetRequestPage from "../resetRequest";

describe("ResetRequest Component", () => {
  it("It should open the modal", () => {
    const resetComponent = mount(<ResetRequestPage />);
    resetComponent.find("button.ui.button").simulate("click");
    const formText = resetComponent.find("div.modal.active div.ui.header");
    expect(formText.first().text()).toEqual("Send reset link");
    resetComponent.unmount();
  });

  it("It should contain a send icon", () => {
    const resetComponent = mount(<ResetRequestPage />);
    resetComponent.find("button.ui.button").simulate("click");
    const sendIcon = resetComponent.find("div.modal.active div.ui.header");
    expect(sendIcon.find("i.send.icon").exists()).toEqual(true);
    resetComponent.unmount();
  });

  it("It should contain an input field", () => {
    const resetComponent = mount(<ResetRequestPage />);
    resetComponent.find("button.ui.button").simulate("click");
    const input = resetComponent.find("div.modal.active div.content form.ui.form div.field");
    expect(input.find("input").exists()).toEqual(true);
    resetComponent.unmount();
  });

  it("It should contain a button", () => {
    const resetComponent = mount(<ResetRequestPage />);
    resetComponent.find("button.ui.button").simulate("click");
    const button = resetComponent.find("button.ui.button.teal.send_reset_link");
    expect(button.find(".send_reset_link").text()).toEqual("Send request");
    resetComponent.unmount();
  });
});
