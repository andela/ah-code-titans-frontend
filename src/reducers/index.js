import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loginReducer from "./loginReducer";
import registrationReducer from "./registrationReducer";
import userSettingsReducer from "./userSettingsReducer";

export default history => combineReducers({
  router: connectRouter(history),
  registrationReducer,
  loginReducer,
  userSettingsReducer
});
