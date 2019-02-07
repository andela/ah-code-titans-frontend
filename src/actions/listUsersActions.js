/* eslint-disable import/prefer-default-export */
import * as types from "./actionTypes";
import RetrieveUserProfilesAPI from "../api/fetchProfilesAPI";
import { history } from "../store/configureStore";
import toastr from "../helpers/toastrConfig";

export const requestUserProfilesSuccess = (payload = {}) => ({
  type: types.REQUEST_PROFILES_SUCCESS,
  payload
});

export const requestUserProfilesFailure = (payload = {}) => ({
  type: types.REQUEST_PROFILES_FAILURE,
  payload
});

export const requestUserProfiles = () => ({
  type: types.REQUEST_PROFILES
});

export const profiles = () => (dispatch) => {
  dispatch(requestUserProfiles());
  RetrieveUserProfilesAPI.getUsers().then((response) => {
    if (response.success) {
      dispatch(requestUserProfilesSuccess(response.content.data.profile.results));
    } else {
      dispatch(requestUserProfilesFailure(response.error));
      if (response.error.status === 401) {
        toastr.error("You have been logged out. Please gsdfsdslog in and try again");
        history.push("/");
        history.go(0);
      } else if (response.error.status === 500 || response.response.status === 504) {
        toastr.info("Please try again after some time");
        history.push("/profile");
        history.go(0);
      }
    }
  });
};
