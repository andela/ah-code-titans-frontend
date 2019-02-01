/* eslint-disable import/prefer-default-export */
import toastr from "../helpers/toastrConfig";
import * as types from "./actionTypes";
import AuthenticationAPI from "../api/authenticationAPI";
import { history } from "../store/configureStore";

export const loginByEmailActionSuccess = (auth = {}) => ({
  type: types.LOGIN_BY_EMAIL_SUCCESS,
  payload: auth
});

export const loginByEmailActionFailure = (content = {}) => ({
  type: types.LOGIN_BY_EMAIL_FAILURE,
  payload: content
});

export const loginRequest = () => ({
  type: types.LOGIN_REQUEST
});

export const login = userDetails => (dispatch) => {
  dispatch(loginRequest());
  AuthenticationAPI.login(userDetails).then((response) => {
    if (response.success) {
      toastr.success("Login Successful");
      localStorage.setItem("user", JSON.stringify(response.content));
      dispatch(loginByEmailActionSuccess(response.content));
      history.replace("/");
    } else {
      toastr.error(response.error.message);
      dispatch(loginByEmailActionFailure(response.error));
    }
  });
};

export const loginBySocial = data => ({
  type: types.LOGIN_BY_SOCIAL,
  data
});

export const logoutSuccess = () => ({
  type: types.LOG_OUT
});

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());

  setTimeout(() => {
    localStorage.removeItem("user");
    window.location.href = "/";
  }, 1000);
};
