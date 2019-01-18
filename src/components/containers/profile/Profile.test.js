import React from "react";
import { shallow } from "enzyme";
import Profile from "./Profile";

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
