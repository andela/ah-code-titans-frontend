import React from "react";
// import { mount } from "enzyme";
import GeneralHeader from "../generalHeader";
import { setup } from "../../../../setupTests";

describe("General Header :", () => {
  const props = {
    currentPath: "/"
  };

  it("renders the login button", () => {
    const { enzymeWrapper } = setup(<GeneralHeader {...props} />);
    expect(enzymeWrapper.find("button").text()).toBe("Login / Sign Up");
  });
});
