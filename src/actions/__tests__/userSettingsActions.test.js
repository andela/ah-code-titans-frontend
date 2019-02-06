import configureStore from "redux-mock-store";
import * as types from "../actionTypes";
import * as UserSettingsActions from "../userSettingsActions";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("User Settings actions: ", () => {
  let store = {};

  beforeAll(() => {
    store = mockStore({});
  });

  it("should dispatch SKIP_WALKTHROUGH type", () => {
    expect(store.dispatch(UserSettingsActions.skipWalkThrough()).type)
      .toEqual(types.SKIP_WALKTHROUGH);
  });
});
