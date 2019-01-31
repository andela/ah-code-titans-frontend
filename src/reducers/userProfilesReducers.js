import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_PROFILES_SUCCESS: {
      const profiles = objectAssign({}, state);
      profiles.users = profiles.users.concat(action.payload);
      return profiles;
    }
    case types.REQUEST_PROFILES_FAILURE: {
      const profiles = objectAssign({}, state.profiles);
      profiles.state = "error";
      profiles.error = action.payload;
      return { ...state, profiles };
    }
    case types.REQUEST_PROFILES: {
      const profiles = objectAssign({}, state.profiles);
      return { ...state, profiles };
    }
    default:
      return state;
  }
};
