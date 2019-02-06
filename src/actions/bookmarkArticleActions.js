import * as types from "./actionTypes";
import bookmarkArticleApi from "../api/bookmarkArticleApi";
import { checkIfUnauthorized } from "./authenticationActions";

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

export const bookmarkArticle = (
  slug,
  onSuccess = () => { },
  onFailure = () => { }
) => (dispatch) => {
  bookmarkArticleApi.bookmarkApi(slug).then((response) => {
    if (response.success) {
      dispatch(bookmarkArticleSuccess(response.content));
      onSuccess();
    } else {
      checkIfUnauthorized(response, dispatch);
      onFailure();
    }
  });
};

export const unBookmarkArticle = (
  slug,
  onSuccess = () => { },
  onFailure = () => { }
) => (dispatch) => {
  bookmarkArticleApi.unBookmarkApi(slug).then((response) => {
    if (response.success) {
      dispatch(unBookmarkArticleSuccess(response.content));
      onSuccess();
    } else {
      checkIfUnauthorized(response, dispatch, () => unBookmarkArticle(slug));
      onFailure();
    }
  });
};
