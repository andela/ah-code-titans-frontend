import * as types from "./ActionTypes";

export const welcomeAction = message => {
  return {
    type: types.WELCOME_MESSAGE,
    message
  };
};
