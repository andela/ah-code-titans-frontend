import * as types from "./actionTypes";
import profileApi from "../api/profile";

export const getprofileSuccess = data => ({
  type: types.GET_PROFILE_SUCCESS,
  data
});

export const updateprofileSuccess = data => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  data
});

export const getProfile = () => dispatch => {
  const username = localStorage.getItem("username");
  profileApi.profile(username).then(response => {
    if (response.content) {
      dispatch(getprofileSuccess(response.content.profile));
    } else if (response) {
      console.log(response);
    }
  });
};

export const updateProfile = data => dispatch => {
  const username = localStorage.getItem("username");
  profileApi.updateProfile(username, data).then(response => {
    if (response.content) {
      dispatch(updateprofileSuccess(response.content.profile));
    }
  });
};
