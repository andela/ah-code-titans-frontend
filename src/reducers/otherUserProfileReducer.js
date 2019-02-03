import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS: {
      let searchedProfile = objectAssign({}, state.searchedProfile);
      searchedProfile = action.data;
      // console.log(searchedProfile);
      return { ...state, searchedProfile };
    }
    default: {
      return state;
    }
  }
};
