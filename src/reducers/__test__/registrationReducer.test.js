import userRegistration from "../registrationReducer";
import * as types from "../../actions/actionTypes";

describe("registration reducer", () => {
  it("should return the initial state", () => {
    expect(userRegistration(undefined, {})).toEqual({
      isFetching: false
    });
  });

  it("should handle REGISTER_SUCCESS", () => {
    expect(
      userRegistration({}, {
        type: types.REGISTER_SUCCESS,
        isFetching: false
      })
    ).toEqual({
      isFetching: false
    });
  });
});
