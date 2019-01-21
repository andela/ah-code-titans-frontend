import React from "react";

import UserHeader from "../userHeader";
import { setup } from "../../../../setupTests";

describe("User Header :", () => {
  it("renders without crashing", () => {
    const props = {
      currentPath: "/",
      auth: {
        authentication: "",
        user: {
          username: "bettbrian08"
        }
      }
    };

    const { enzymeWrapper } = setup(<UserHeader {...props} />);
    expect(enzymeWrapper.find(".ui.header").text()).toBe("Authors Haven");
  });
});
