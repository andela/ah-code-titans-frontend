import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loginReducer from "./loginReducer";
import registrationReducer from "./registrationReducer";
import likeDislike from "./likeDislikeReducer";
import userSettingsReducer from "./userSettingsReducer";
import comment from "./commentReducer";
import profileReducer from "./profileReducer";
import article from "./articleReducer";
import tag from "./tagSearchReducer";
import rateArticle from "./rateArticleReducer";
import bookmark from "./bookmarkArticleReducer";

export default history => combineReducers({
  router: connectRouter(history),
  registrationReducer,
  loginReducer,
  userSettingsReducer,
  profileReducer,
  article,
  tag,
  likeDislike,
  comment,
  rateArticle,
  bookmark
});
