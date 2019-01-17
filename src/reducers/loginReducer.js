import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_BY_EMAIL_SUCCESS: {
      const auth = objectAssign({}, state.auth);
      auth.user = action.payload;
      auth.authentication = "email";
      return { ...state, auth };
    }
    case types.LOGIN_BY_EMAIL_FAILURE: {
      const login = objectAssign({}, state.login);
      login.state = "error";
      login.error = action.payload;
      return { ...state, login };
    }
    default:
      return state;
  }
};
