import * as types from "./actionTypes";
import profileApi from "../api/profileAPI";
import { checkIfUnauthorized } from "./authenticationActions";

export const getprofileSuccess = data => ({
  type: types.GET_PROFILE_SUCCESS,
  data
});

export const updateprofileSuccess = data => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  data
});

export const getProfile = username => (dispatch) => {
  profileApi.profile(username).then((response) => {
    if (response.content) {
      dispatch(getprofileSuccess(response.content.profile));
    }
  });
};

export const updateProfile = (username, data) => (dispatch) => {
  profileApi.updateProfile(username, data).then((response) => {
    if (response.success) {
      dispatch(updateprofileSuccess(response.content.profile));
    } else {
      checkIfUnauthorized(response, dispatch, () => updateProfile(username, data));
    }
  });
};
