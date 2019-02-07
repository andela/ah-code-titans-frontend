import configureStore from "redux-mock-store";
import * as types from "../actionTypes";
import * as listUserActions from "../listUsersActions";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("List Users Actions", () => {
  let store = {};

  beforeAll(() => {
    store = mockStore({});
  });

  it("Should dispatch REQUEST_PROFILES type", () => {
    expect(store.dispatch(listUserActions.requestUserProfiles()).type)
      .toEqual(types.REQUEST_PROFILES);
  });

  it("Should dispatch REQUEST_PROFILES_SUCCESS", () => {
    expect(store.dispatch(listUserActions.requestUserProfilesSuccess()).type)
      .toEqual(types.REQUEST_PROFILES_SUCCESS);
  });

  it("Shoul dispatch REQUEST_PROFILES_FAILURE type", () => {
    const failure = store.dispatch(listUserActions.requestUserProfilesFailure());
    expect(failure.type).toEqual(types.REQUEST_PROFILES_FAILURE);
  });
});
