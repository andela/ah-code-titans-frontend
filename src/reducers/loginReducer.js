import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_BY_EMAIL_SUCCESS: {
      const auth = objectAssign({}, state.auth);
      auth.user = action.payload;
      auth.authentication = "email";
      auth.isFetching = false;
      return { ...state, auth };
    }
    case types.LOGIN_BY_EMAIL_FAILURE: {
      const auth = objectAssign({}, state.auth);
      const login = objectAssign({}, state.login);
      login.state = "error";
      login.error = action.payload;
      auth.isFetching = false;
      return { ...state, auth, login };
    }
    case types.LOGIN_REQUEST: {
      const auth = objectAssign({}, state.auth);
      auth.isFetching = true;
      return { ...state, auth };
    }
    case types.LOGIN_BY_SOCIAL: {
      const auth = objectAssign({}, state.auth);
      auth.authentication = "social";
      auth.user = { username: action.data.username };
      return { ...state, auth };
    }
    default:
      return state;
  }
};
