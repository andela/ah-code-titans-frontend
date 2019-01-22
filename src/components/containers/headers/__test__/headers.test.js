import React from "react";
import { shallow } from "enzyme";
import { Header } from "../index";
import GeneralHeader from "../generalHeader";
import UserHeader from "../userHeader";

describe("General Header :", () => {
  it("renders GeneralHeader without crashing", () => {
    const props = {
      auth: {
        authentication: "",
        user: {}
      },
      location: {
        pathname: "/"
      }
    };

    const enzymeWrapper = shallow(<Header {...props} />);
    expect(enzymeWrapper.find(GeneralHeader).exists()).toBe(true);
  });

  it("renders UserHeader without crashing", () => {
    const props = {
      auth: {
        authentication: "email",
        user: {
          username: "johndoe1"
        }
      },
      location: {
        pathname: "/"
      }
    };

    const enzymeWrapper = shallow(<Header {...props} />);
    expect(enzymeWrapper.find(UserHeader).exists()).toBe(true);
  });
});
