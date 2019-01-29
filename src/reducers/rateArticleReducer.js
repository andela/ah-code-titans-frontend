import * as types from "../actions/actionTypes";

export default function rateArticleReducer(state = {}, action = {}) {
  switch (action.type) {
    case types.RATE_ARTICLE_SUCCESS: {
      return { ...state, rating: action.data };
    }
    case types.GET_ARTICLE_RATING_SUCCESS: {
      return { ...state, rating: action.data };
    }

    default: {
      return state;
    }
  }
}
