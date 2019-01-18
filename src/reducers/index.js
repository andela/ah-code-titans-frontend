import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loginReducer from "./loginReducer";
import registrationReducer from "./registrationReducer";

export default history => combineReducers({
  router: connectRouter(history),
  registrationReducer,
  loginReducer
});
