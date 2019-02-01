import * as types from "../actions/actionTypes";

export default function bookmarkArticleReducer(state = {}, action = {}) {
  switch (action.type) {
    case types.BOOKMARK_ARTICLE_SUCCESS: {
      return { ...state, bookmark: action.data };
    }

    case types.BOOKMARK_ARTICLE_FAILURE: {
      return { ...state, bookmark: action.data };
    }
    case types.UN_BOOKMARK_ARTICLE_SUCCESS: {
      return { ...state, bookmark: action.data };
    }

    case types.UN_BOOKMARK_ARTICLE_FAILURE: {
      return { ...state, bookmark: action.data };
    }

    default: {
      return state;
    }
  }
}
