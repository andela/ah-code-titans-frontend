import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../actions/actionTypes";

/* eslint-disable import/prefer-default-export */
const userRegistration = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { isFetching: action.isFetching };
    case REGISTER_FAILURE:
      return {
        isFetching: action.isFetching,
        errors: action.errors
      };
    case REGISTER_SUCCESS:
      return {
        isFetching: action.isFetching,
        response: action.response
      };
    default:
      return state;
  }
};

export default userRegistration;
