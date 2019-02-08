import React from "react";

import UserHeader from "../userHeader";
import { setup } from "../../../../setupTests";

describe("User Header :", () => {
  const props = {
    currentPath: "/",
    auth: {
      authentication: "",
      user: {
        username: "bettbrian08"
      }
    }
  };

  it("renders app title", () => {
    const { enzymeWrapper } = setup(<UserHeader {...props} />);
    expect(enzymeWrapper.find(".ui.header").text()).toBe("Authors Haven");
  });
});
