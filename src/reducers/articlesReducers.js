import * as types from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_ARTICLE_SUCCESS: {
      return { ...state, article: action.payload };
    }
    case (types.GET_SPECIFIC_ARTICLE_SUCCESS): {
      return { ...state, singleArticle: action.payload };
    }
    default:
      return state;
  }
};
