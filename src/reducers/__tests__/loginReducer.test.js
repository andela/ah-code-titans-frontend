// test login reducer
import * as types from "../../actions/actionTypes";
import loginReducer from "../loginReducer";
import initialState from "../../store/initialState";
import { testDetails } from "../../actions/__tests__/authenticationActions.test";

describe("reducer", () => {
  it("should return the initial state", () => {
    expect(loginReducer(initialState.login, {})).toEqual(initialState.login);
  });

  it("should handle LOGIN_BY_EMAIL_SUCCESS ", () => {
    expect(
      loginReducer(initialState.login, {
        type: types.LOGIN_BY_EMAIL_SUCCESS,
        payload: testDetails
      })
    ).toEqual({
      auth: { authentication: "email", isFetching: false, user: testDetails },
      authPopup: false,
      login: { error: null, state: "" }
    });
  });

  it("should handle LOGIN_BY_EMAIL_FAILURE", () => {
    const details = {
      payload: {
        message: "Invalid Password!"
      }
    };

    expect(
      loginReducer({
        auth: {
          authentication: "",
          user: {},
          isFetching: false
        },
        login: {
          state: "",
          error: null
        },
        authPopup: false
      }, {
        type: types.LOGIN_BY_EMAIL_FAILURE,
        payload: details
      })
    ).toEqual({
      auth: {
        authentication: "",
        isFetching: false,
        user: {}
      },
      authPopup: false,
      login: { error: { payload: { message: "Invalid Password!" } }, state: "error" }
    });
  });
});
