import userProfile from "../otherUserProfileReducer";
import initialState from "../../store/initialState";
import * as types from "../../actions/actionTypes";

const user = {
  bio: "I am a coder and I enjoy gaming and swimming.",
  company: "Netflix",
  image:
      "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
  location: "Nairobi",
  phone: "0712345678",
  username: "deno",
  website: "https://netflix.com"
};

describe("Test other user profile ", () => {
  it("Should retrieve the initial state", () => {
    expect(userProfile({}, {})).toEqual({});
  });

  it("Should handle GET_USER_PROFILE_SUCCESS", () => {
    expect(
      userProfile(initialState.searchedProfile, {
        type: types.GET_USER_PROFILE_SUCCESS,
        data: user
      }).user
    ).toEqual({ user }.user);
  });
});
