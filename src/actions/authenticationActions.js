/* eslint-disable import/prefer-default-export */
import toastr from "toastr";
import * as types from "./actionTypes";
import AuthenticationAPI from "../api/authenticationAPI";

export const loginByEmailActionSuccess = (auth = {}) => ({
  type: types.LOGIN_BY_EMAIL_SUCCESS,
  payload: auth
});

export const loginByEmailActionFailure = (content = {}) => ({
  type: types.LOGIN_BY_EMAIL_FAILURE,
  payload: content
});

export const login = userDetails => (dispatch) => {
  AuthenticationAPI.login(userDetails).then((response) => {
    if (response.success) {
      toastr.success("Login Successful");
      localStorage.setItem("user", JSON.stringify(response.content));
      dispatch(loginByEmailActionSuccess(response.content));
    } else {
      toastr.error(response.content.message);
      dispatch(loginByEmailActionFailure(response.content));
    }
  });
};