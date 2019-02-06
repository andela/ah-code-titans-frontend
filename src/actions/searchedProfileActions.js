import * as types from "./actionTypes";
import RetrieveUserProfilesAPI from "../api/fetchProfilesAPI";

export const getUserProfileSuccess = data => ({
  type: types.GET_USER_PROFILE_SUCCESS,
  data
});

export const fetchOtherProfile = username => (dispatch) => {
  RetrieveUserProfilesAPI.retrieveSpecificProfile(username).then((response) => {
    if (response) {
      dispatch(getUserProfileSuccess(response.data.profile));
    }
  });
};
