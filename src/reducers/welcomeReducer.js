import * as types from "../actions/actionTypes";

export default function welcomeReducer(state = {}, action) {
  switch (action.type) {
    case types.WELCOME_MESSAGE:
      return { message: action.message };

    default:
      return state;
  }
}
