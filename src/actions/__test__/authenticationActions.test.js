import * as ActionCreators from "../authenticationActions";
import * as types from "../actionTypes";

// eslint-disable-next-line import/prefer-default-export
export const testDetails = {
  user: {
    email: "daviskimame87@gmail.com",
    refresh_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.",
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.",
    username: "daviskimame"
  }
};
// describe creates a test suite
// testing actions creators
describe("action", () => {
  // action login success
  it("should create an action to update user login success", () => {
    const expectedAction = {
      type: types.LOGIN_BY_EMAIL_SUCCESS,
      payload: testDetails
    };
    expect(ActionCreators.loginByEmailActionSuccess(testDetails)).toEqual(expectedAction);
  });

  // action login failure
  it("should creat an action to update user login failure", () => {
    const details = {
      payload: {
        message: "Invalid Password!"
      }
    };
    const expectedAction = {
      type: types.LOGIN_BY_EMAIL_FAILURE,
      payload: details
    };
    expect(ActionCreators.loginByEmailActionFailure(details)).toEqual(expectedAction);
  });
});

// testing async action creators
// describe("async action creators", () => {
//   it("async", () => {});
// });
