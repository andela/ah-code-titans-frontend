import React from "react";
import { Redirect } from "react-router-dom";
import { SocialAuthentication } from "../socialAuthenticationLanding";
import { setup } from "../../../setupTests";

describe("SocialAuthenticationLanding :", () => {
  let props = {};

  beforeEach(() => {
    props = {
      location: {
        search: {
          success: "false"
        }
      },
      settings: {
        walkThrough: true
      },
      actions: {
        auth: {
          loginBySocial: username => username
        }
      }
    };
  });

  it("renders successful as new user", () => {
    props.location.search = {
      username: "johndoe",
      success: "true",
      new_user: "true"
    };

    const { enzymeWrapper } = setup(<SocialAuthentication {...props} />);
    const button = enzymeWrapper.find("button");

    expect(button.at(0).text()).toBe("Get Started");
  });

  it("renders successful not as new user", () => {
    props.location.search = {
      username: "johndoe",
      success: "true",
      new_user: "false"
    };

    const { enzymeWrapper } = setup(<SocialAuthentication {...props} />);
    const button = enzymeWrapper.find("button");

    expect(button.at(0).text()).toBe("Don't show this again");
    expect(button.at(1).text()).toBe("Continue");
  });

  it("renders successful not as new user and disallow walkthrough", () => {
    props.location.search = {
      username: "johndoe",
      success: "true",
      new_user: "false"
    };
    props.settings.walkThrough = false;
    const { enzymeWrapper } = setup(<SocialAuthentication {...props} />);
    expect(enzymeWrapper.find(Redirect).exists()).toBe(true);
  });

  it("renders successful error page", () => {
    const { enzymeWrapper } = setup(<SocialAuthentication {...props} />);
    const button = enzymeWrapper.find("button");
    expect(button.text()).toBe("Homepage");
  });
});
