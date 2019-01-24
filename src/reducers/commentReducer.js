import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";

const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ARTICLE_COMMENTS_SUCCESS: {
      const articles = objectAssign({}, state.articles);
      articles.comments = action.payload;
      return { ...state.articles, articles };
    }
    default:
      return state;
  }
};

export default commentReducer;
