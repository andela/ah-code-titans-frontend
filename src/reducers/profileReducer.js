import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";

export default function profileReducer(state = {}, action = {}) {
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS: {
      let profile = objectAssign({}, state.profile);
      profile = action.data;
      return { ...state, profile };
    }
    case types.UPDATE_PROFILE_SUCCESS: {
      let profile = objectAssign({}, state.profile);
      profile = action.data;
      return { ...state, profile };
    }

    default: {
      return state;
    }
  }
}
