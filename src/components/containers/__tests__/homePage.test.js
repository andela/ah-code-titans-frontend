import React from "react";
import HomePage from "../homePage";
import { setup } from "../../../setupTests";

describe("Home Page :", () => {
  const props = {
    location: {
      search: {}
    }
  };

  it("renders without crashing", () => {
    const { enzymeWrapper } = setup(<HomePage {...props} />);
    expect(enzymeWrapper).not.toBe(undefined);
  });

  it("renders common tags list", () => {
    const { enzymeWrapper } = setup(<HomePage {...props} />);
    const commonTags = enzymeWrapper.find(".hp__tags .item");
    expect(commonTags.length).toBe(19);
  });
});
