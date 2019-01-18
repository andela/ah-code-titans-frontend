import * as types from "../actionTypes";
import * as actionCreators from "../profileActions";

const profileDetails = {
  bio: "I am a coder and I enjoy gaming and swimming.",
  company: "Netflix",
  image:
    "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
  location: "Nairobi",
  phone: "0712345678",
  username: "deno",
  website: "https://netflix.com"
};

const updatedProfileDetails = {
  bio: "Gamer.",
  company: "Andela",
  image:
    "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
  location: "Mombasa",
  phone: "0712345678",
  username: "deno",
  website: "https://netflix.com"
};

// test action creators
describe("actions", () => {
  it("should return a get action", () => {
    const expectedAction = {
      type: types.GET_PROFILE_SUCCESS,
      profileDetails
    };
    expect(actionCreators.getprofileSuccess(profileDetails).data).toEqual(
      expectedAction.profileDetails
    );
  });

  it("should return an update action", () => {
    const expectedUpdateAction = {
      type: types.UPDATE_PROFILE_SUCCESS,
      updatedProfileDetails
    };
    expect(
      actionCreators.updateprofileSuccess(updatedProfileDetails).data
    ).toEqual(expectedUpdateAction.updatedProfileDetails);
  });
});
