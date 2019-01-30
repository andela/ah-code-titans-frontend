// test login reducer
import * as types from "../../actions/actionTypes";
import userSettingsReducer from "../userSettingsReducer";
import initialState from "../../store/initialState";

describe("reducer", () => {
  it("should return the initial state", () => {
    expect(
      userSettingsReducer(
        initialState.userSettingsReducer,
        {}
      )
    ).toEqual(initialState.userSettingsReducer);
  });

  it("should handle SKIP_WALKTHROUGH ", () => {
    expect(
      userSettingsReducer(initialState.userSettingsReducer, {
        type: types.SKIP_WALKTHROUGH
      })
    ).toEqual({ settings: { walkThrough: false } });
  });
});
