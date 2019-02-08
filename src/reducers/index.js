import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import login from "./loginReducer";
import registration from "./registrationReducer";
import likeDislike from "./likeDislikeReducer";
import userSettings from "./userSettingsReducer";
import comment from "./commentReducer";
import profile from "./profileReducer";
import article from "./articleReducer";
import rateArticle from "./rateArticleReducer";
import bookmarkArticle from "./bookmarkArticleReducer";
import readingStats from "./readingStatsReducer";
import profiles from "./userProfilesReducers";
import searchedProfile from "./otherUserProfileReducer";

export default history => combineReducers({
  router: connectRouter(history),
  registration,
  login,
  userSettings,
  profile,
  article,
  likeDislike,
  comment,
  rateArticle,
  bookmarkArticle,
  readingStats,
  profiles,
  searchedProfile
});
