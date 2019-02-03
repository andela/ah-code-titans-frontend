import * as types from "./actionTypes";
import RetrieveUserProfilesAPI from "../api/fetchProfilesAPI";

export const getprofileSuccess = data => ({
  type: types.GET_PROFILE_SUCCESS,
  data
});

export const fetchOtherProfile = username => (dispatch) => {
  RetrieveUserProfilesAPI.retrieveSpecificProfile(username).then((response) => {
    if (response) {
      dispatch(getprofileSuccess(response.data.profile));
    }
  });
};
