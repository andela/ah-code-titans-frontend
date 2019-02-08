import * as types from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case types.GET_USER_PROFILE_SUCCESS: {
      return { ...state, user: action.data };
    }
    default: {
      return state;
    }
  }
};
