import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../actions/actionTypes";

/* eslint-disable import/prefer-default-export */
const userRegistration = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { isFetching: true };
    case REGISTER_FAILURE:
      return {
        isFetching: false,
        errors: action.errors
      };
    case REGISTER_SUCCESS:
      return {
        isFetching: false,
        response: action.response
      };
    default:
      return state;
  }
};

export default userRegistration;
