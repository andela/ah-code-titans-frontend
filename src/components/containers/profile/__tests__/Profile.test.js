/* eslint-disable import/no-named-as-default */
import { shallow } from "enzyme";
import React from "react";
import Profile from "../Profile";

describe("Profile: ", () => {
  let profileContainer;
  beforeEach(() => {
    profileContainer = shallow(<Profile />);
  });

  it("gets profile: ", () => expect(profileContainer.exists()).toEqual(true));
  it("renders props: ", () => {
    const profile = shallow(<Profile data="titan" />);
    expect(profile.instance().props.data).toBe("titan");
  });
});
