/* eslint-disable import/prefer-default-export */
import * as types from "./actionTypes";
import RetrieveUserProfilesAPI from "../api/fetchProfilesAPI";

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
    if (response) {
      dispatch(requestUserProfilesSuccess(response.data.profile.results));
    } else {
      dispatch(requestUserProfilesFailure(response.error));
    }
  });
};
