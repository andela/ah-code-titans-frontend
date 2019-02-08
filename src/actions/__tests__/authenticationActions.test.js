import configureStore from "redux-mock-store";
import * as AuthenticationActions from "../authenticationActions";
import * as types from "../actionTypes";

const middlewares = [];
const mockStore = configureStore(middlewares);

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
describe("Authentication actions: ", () => {
  let store = {};

  beforeAll(() => {
    store = mockStore({});
  });

  // action login success
  it("should create an action to update user login success", () => {
    const expectedAction = {
      type: types.LOGIN_BY_EMAIL_SUCCESS,
      payload: testDetails
    };
    expect(AuthenticationActions.loginByEmailActionSuccess(testDetails)).toEqual(expectedAction);
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
    expect(AuthenticationActions.loginByEmailActionFailure(details)).toEqual(expectedAction);
  });

  it("should dispatch LOGIN_BY_SOCIAL type", () => {
    expect(store.dispatch(AuthenticationActions.loginBySocial({})).type)
      .toEqual(types.LOGIN_BY_SOCIAL);
  });

  it("should dispatch LOG_OUT type", () => {
    expect(store.dispatch(AuthenticationActions.logoutSuccess({})).type)
      .toEqual(types.LOG_OUT);
  });
});
