import React from "react";
import { shallow } from "enzyme";
import Header from "../index";

describe("General Header :", () => {
  it("renders without crashing", () => {
    const props = {
      auth: {
        authentication: "",
        user: {}
      },
      location: {
        pathname: "/"
      }
    };

    shallow(<Header {...props} />);
  });
});
