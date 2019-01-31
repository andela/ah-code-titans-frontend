import * as types from "../../actions/actionTypes";
import initialState from "../../store/initialState";
import profileReducer from "../profileReducer";

const data = {
  username: "deno",
  bio: "I am a coder and I enjoy gaming and swimming.",
  image:
    "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
  company: "Netflix",
  website: "https://netflix.com",
  location: "Nairobi",
  phone: "0712345678",
  following: false
};

describe("reducer: ", () => {
  it("should return initial state", () => {
    expect(profileReducer(initialState.profileReducer, {})).toEqual(
      initialState.profileReducer
    );
  });

  it("should return fetched profile", () => {
    expect(
      profileReducer(initialState.profileReducer, {
        type: types.GET_PROFILE_SUCCESS,
        data
      }).profile
    ).toEqual(data);
  });
});
