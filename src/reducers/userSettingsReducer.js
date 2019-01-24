import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";

export default function userSettingsReducer(state = [], action) {
  switch (action.type) {
    case types.SKIP_WALKTHROUGH: {
      const settings = objectAssign({}, state.settings);
      settings.walkThrough = false;
      return { ...state, settings };
    }
    default:
      return state;
  }
}
