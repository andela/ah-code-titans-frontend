import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import welcomeReducer from "./welcomeReducer";

export default history => combineReducers({
  router: connectRouter(history),
  welcomeReducer
});
