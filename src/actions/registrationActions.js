import toastr from "../helpers/toastrConfig";

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "./actionTypes";
import instance from "../api/axiosConfig";

/* eslint-disable import/prefer-default-export */
export const registerRequest = () => ({
  type: REGISTER_REQUEST,
  isFetching: true
});

export const registerSuccess = response => ({
  type: REGISTER_SUCCESS,
  isFetching: false,
  response
});

export const registerFailure = errors => ({
  type: REGISTER_FAILURE,
  isFetching: false,
  errors
});

const registrationAsync = user => (dispatch) => {
  dispatch(registerRequest());
  instance
    .post("api/users/", user)
    .then((res) => {
      const response = res.data;
      toastr.success(response.user.message);
      dispatch(registerSuccess(response));
    })
    .catch((err) => {
      const { data } = err.response;

      if (err.response.status === 504 || err.response.status === 500) {
        toastr.error("Opps! something went wrong try again after sometime");
      }
      if (err.response.status === 400) {
        const errorKeys = Object.keys(data.errors);
        if (errorKeys.indexOf("email") !== -1) {
          toastr.error(data.errors.email);
        }
        if (errorKeys.indexOf("password") !== -1) {
          toastr.error(data.errors.password);
        }
        if (errorKeys.indexOf("username") !== -1) {
          toastr.error(data.errors.username);
        }
      }
      dispatch(registerFailure(data.errors));
    });
};

export default registrationAsync;
