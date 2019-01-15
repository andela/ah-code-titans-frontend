import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import registration from "./registrationReducer";

export default history => combineReducers({
  router: connectRouter(history),
  registration
});
