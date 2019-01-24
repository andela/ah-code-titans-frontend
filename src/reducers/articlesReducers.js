import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_ARTICLE_SUCCESS: {
      const articles = objectAssign({}, state.articles);
      articles.article = action.payload;
      return { ...state, articles };
    }
    case (types.GET_SPECIFIC_ARTICLE_SUCCESS): {
      const articles = objectAssign({}, state.articles);
      articles.single_article = action.payload;
      return { ...state, singleArticle: articles };
    }
    default:
      return state;
  }
};
