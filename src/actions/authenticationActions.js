/* eslint-disable import/prefer-default-export */
import objectAssign from "object-assign";
import toastr from "../helpers/toastrConfig";
import * as types from "./actionTypes";
import AuthenticationAPI from "../api/authenticationAPI";
import { store } from "../store";

export const toggleForceAuthPopup = () => ({
  type: types.TOGGLE_AUTH_POPUP
});

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
    dispatch(toggleForceAuthPopup());
  }, 1000);
};

function refreshToken(user, dispatch, onRefresh) {
  AuthenticationAPI.refreshToken().then((response) => {
    if (response.success) {
      const newUser = objectAssign({}, user);
      newUser.token = response.accessToken;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(loginByEmailActionSuccess(newUser));
      setTimeout(() => {
        onRefresh();
      }, 1000);
    } else {
      dispatch(logout());
    }
  });
}

export const checkIfUnauthorized = (response, dispatch, onRefresh = () => {}) => {
  if (response.error.status === 401) {
    const user = objectAssign({}, store.getState().login.auth);
    if (user.authentication === "") dispatch(logout());
    else refreshToken(user.user, dispatch, onRefresh);

    return true;
  }
  return false;
};
