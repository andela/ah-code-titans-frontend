/* eslint-disable import/prefer-default-export */
import * as types from "./actionTypes";

export const welcomeAction = message => ({
  type: types.WELCOME_MESSAGE,
  message
});
