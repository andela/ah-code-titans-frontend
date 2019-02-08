import * as types from "./actionTypes";
import bookmarkArticleApi from "../api/bookmarkArticleApi";
import { getSingleArticle } from "./articleActions";

export const bookmarkArticleSuccess = data => ({
  type: types.BOOKMARK_ARTICLE_SUCCESS,
  data
});

export const bookmarkArticleFailure = data => ({
  type: types.BOOKMARK_ARTICLE_FAILURE,
  data
});

export const unBookmarkArticleSuccess = data => ({
  type: types.UN_BOOKMARK_ARTICLE_SUCCESS,
  data
});

export const unBookmarkArticleFailure = data => ({
  type: types.UN_BOOKMARK_ARTICLE_FAILURE,
  data
});

export const getBookmarkSuccess = data => ({
  type: types.GET_ALL_BOOKMARKS_SUCCESS,
  data
});

export const getBookmarks = () => (dispatch) => {
  bookmarkArticleApi.getBookmarksApi().then((response) => {
    if (response.success) {
      dispatch(getBookmarkSuccess(response.content));
    }
  });
};

export const bookmarkArticle = slug => (dispatch) => {
  bookmarkArticleApi.bookmarkApi(slug).then((response) => {
    if (response.success) {
      dispatch(bookmarkArticleSuccess(response.content));
      dispatch(getSingleArticle(slug));
      dispatch(getBookmarks());
    } else {
      dispatch(bookmarkArticleFailure(response.error.data.message));
    }
  });
};

export const unBookmarkArticle = slug => (dispatch) => {
  bookmarkArticleApi.unBookmarkApi(slug).then((response) => {
    if (response.success) {
      dispatch(unBookmarkArticleSuccess(response.content));
      dispatch(getSingleArticle(slug));
      dispatch(getBookmarks());
    } else {
      dispatch(unBookmarkArticleFailure(response.error.message));
    }
  });
};
