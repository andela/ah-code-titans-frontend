import * as types from "../actionTypes";
import * as actions from "../registrationActions";

describe("actions", () => {
  it("should create an action to register a user", () => {
    const isFetching = true;
    const expectedAction = {
      type: types.REGISTER_REQUEST,
      isFetching
    };
    expect(actions.registerRequest()).toEqual(expectedAction);
  });

  it("should create an action to return success response", () => {
    const isFetching = false;
    const response = "user data";
    const expectedAction = {
      type: types.REGISTER_SUCCESS,
      isFetching,
      response
    };
    expect(actions.registerSuccess(response)).toEqual(expectedAction);
  });

  it("should create an action to return failure response", () => {
    const isFetching = false;
    const errors = "errors";
    const expectedAction = {
      type: types.REGISTER_FAILURE,
      isFetching,
      errors
    };
    expect(actions.registerFailure(errors)).toEqual(expectedAction);
  });
});
