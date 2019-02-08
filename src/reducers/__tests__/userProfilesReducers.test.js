import userProfilesReducer from "../userProfilesReducers";
import initialState from "../../store/initialState";
import * as types from "../../actions/actionTypes";

const users = [
  {
    bio: "I am a coder and I enjoy gaming and swimming.",
    company: "Netflix",
    image:
        "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
    location: "Nairobi",
    phone: "0712345678",
    username: "deno",
    website: "https://netflix.com"
  },
  {
    bio: "I am a coder and I enjoy gaming and swimming.",
    company: "NTV",
    image:
        "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
    location: "Nairobi",
    phone: "0712345678",
    username: "Brian",
    website: "https://ntv.com"
  },
  {
    bio: "I am a coder and I enjoy gaming and swimming.",
    company: "KTN",
    image:
        "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
    location: "Nairobi",
    phone: "0712345678",
    username: "Beepoo",
    website: "https://ktn.com"
  }
];

describe("Test users Profiles reducer", () => {
  it("Should retrieve initial state", () => {
    expect(userProfilesReducer({}, {})).toEqual({});
  });

  it("Should handle REQUEST_PROFILES_SUCCESS", () => {
    expect(
      userProfilesReducer(initialState.profiles, {
        type: types.REQUEST_PROFILES_SUCCESS,
        payload: users
      })
    ).toEqual({ users });
  });

  it("Should handle REQUEST_PROFILES_FAILURE", () => {
    expect(
      userProfilesReducer(initialState.profiles, {
        type: types.REQUEST_PROFILES_FAILURE,
        payload: "error"
      })
    ).toEqual({ profiles: { error: "error", state: "error" }, users: [] });
  });
});
