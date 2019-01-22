import React from "react";
import { mount } from "enzyme";
import ResetRequestPage from "../resetRequest";

describe("ResetRequest Component", () => {
  let resetComponent = "";

  beforeEach(() => {
    resetComponent = mount(<ResetRequestPage />);
    resetComponent.find("button.ui.button").simulate("click");
  });

  afterEach(() => {
    resetComponent.unmount();
  });

  it("It should open the modal", () => {
    const formText = resetComponent.find("div.modal.active div.ui.header");
    expect(formText.first().text()).toEqual("Request password reset");
  });

  it("It should contain a send icon", () => {
    const sendIcon = resetComponent.find("div.modal.active div.ui.header");
    expect(sendIcon.find("i.send.icon").exists()).toEqual(true);
  });

  it("It should contain an input field", () => {
    const input = resetComponent.find("div.modal.active div.content form.ui.form div.field");
    expect(input.find("input").exists()).toEqual(true);
  });

  it("It should contain a button", () => {
    const button = resetComponent.find("div.modal.active div.content form.ui.form div.field");
    expect(button.find("button.btn-forms-primary.ui.green.inverted.disabled.button").text()).toEqual("Send request");
  });
});
