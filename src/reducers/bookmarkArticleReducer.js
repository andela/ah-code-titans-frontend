import objectAssign from "object-assign";
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
    case types.GET_ALL_BOOKMARKS_SUCCESS: {
      const bookmarkArticle = objectAssign({}, state);
      if (bookmarkArticle.bookmarks.length === 0) {
        bookmarkArticle.bookmarks = bookmarkArticle.bookmarks.concat(action.data);
      } else {
        bookmarkArticle.bookmarks = action.data;
      }
      return bookmarkArticle;
    }
    default: {
      return state;
    }
  }
}
