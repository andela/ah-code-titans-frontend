import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case types.GET_TAG_RELATED_ARTICLES_SUCCESS: {
      const tagSearchedArticles = objectAssign({}, state.tagsearched_articles);
      tagSearchedArticles.articles = action.payload;
      return { ...state, tagSearchedArticles };
    }
    default:
      return state;
  }
};
