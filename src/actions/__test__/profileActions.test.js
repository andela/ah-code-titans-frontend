import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as types from "../actionTypes";
import * as actionCreators from "../profileActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
// test action creators
describe("actions", () => {
  it("should return a get action", () => {
    const store = mockStore({});
    const expectedAction = {
      type: types.GET_PROFILE_SUCCESS,
      profileDetails
    };
    const actionsDispatched = store.dispatch(actionCreators.getprofileSuccess(profileDetails));
    expect(actionsDispatched.data).toEqual(expectedAction.profileDetails);
  });

  it("should return an update action", () => {
    const store = mockStore({});
    const expectedUpdateAction = {
      type: types.UPDATE_PROFILE_SUCCESS,
      updatedProfileDetails
    };

    const actionsDispatched = store.dispatch(
      actionCreators.updateprofileSuccess(updatedProfileDetails)
    );
    expect(actionsDispatched.data).toEqual(expectedUpdateAction.updatedProfileDetails);
  });
});
