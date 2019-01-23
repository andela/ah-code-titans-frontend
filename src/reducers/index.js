import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loginReducer from "./loginReducer";
import registrationReducer from "./registrationReducer";
import likeDislikeReducer from "./likeDislikeReducer";
import userSettingsReducer from "./userSettingsReducer";
import commentReducer from "./commentReducer";
import profileReducer from "./profileReducer";
import article from "./articleReducer";
import tag from "./tagSearchReducer";

export default history => combineReducers({
  router: connectRouter(history),
  registrationReducer,
  loginReducer,
  userSettingsReducer,
  profileReducer,
  article,
  tag,
  commentReducer,
  likeDislikeReducer
});
