import * as types from "../actionTypes";
import * as actions from "../registrationActions";

describe("actions", () => {
  it("should create an action to register a user", () => {
    const expectedAction = {
      type: types.REGISTER_REQUEST
    };
    expect(actions.registerRequest()).toEqual(expectedAction);
  });

  it("should create an action to return success response", () => {
    const response = "user data";
    const expectedAction = {
      type: types.REGISTER_SUCCESS,
      response
    };
    expect(actions.registerSuccess(response)).toEqual(expectedAction);
  });

  it("should create an action to return failure response", () => {
    const errors = "errors";
    const expectedAction = {
      type: types.REGISTER_FAILURE,
      errors
    };
    expect(actions.registerFailure(errors)).toEqual(expectedAction);
  });
});
