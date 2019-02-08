import configureStore from "redux-mock-store";
import * as types from "../actionTypes";
import * as searchedProfileActions from "../searchedProfileActions";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("Search User Profile Actions", () => {
  let store = {};

  beforeAll(() => {
    store = mockStore({});
  });

  it("Should dispatch GET_USER_PROFILE_SUCCESS", () => {
    expect(store.dispatch(searchedProfileActions.getUserProfileSuccess()).type)
      .toEqual(types.GET_USER_PROFILE_SUCCESS);
  });

  it("Should dispatch GET_USER_PROFILE_FAILURE type", () => {
    expect(store.dispatch(searchedProfileActions.getUserProfileFailure()).type)
      .toEqual(types.GET_USER_PROFILE_FAILURE);
  });
});
