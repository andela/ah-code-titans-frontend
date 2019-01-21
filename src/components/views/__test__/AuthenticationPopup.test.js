import React from "react";
import AuthenticationPopup from "../AuthenticationPopup";
import { setup } from "../../../setupTests";

describe("AuthenticationPopup: ", () => {
  it("Test if pop up button and close button toggles popup", () => {
    const { enzymeWrapper } = setup(<AuthenticationPopup />);

    enzymeWrapper.find("button").simulate("click");
    expect(enzymeWrapper.find(".modal").hasClass("active")).toBe(true);

    enzymeWrapper.find(".close.icon").simulate("click");
    expect(enzymeWrapper.find(".modal").exists()).toBe(false);

    enzymeWrapper.unmount();
  });

  describe("Login : ", () => {
    it("Test if 'use email' button transitions to 'login' stage ", () => {
      const { enzymeWrapper } = setup(<AuthenticationPopup />);

      enzymeWrapper.find("button").simulate("click");
      const result = enzymeWrapper.find(".modal").hasClass("active");
      expect(result).toBe(true);

      const useEmailButton = enzymeWrapper.find(".modals button").at(3);

      useEmailButton.simulate("click");
      const backToSocialAuthButton = enzymeWrapper.find(".modal.active #backBtn");

      expect(backToSocialAuthButton.exists()).toBe(true);
      expect(enzymeWrapper.matchesElement(useEmailButton)).toBe(false);
    });
  });
});
