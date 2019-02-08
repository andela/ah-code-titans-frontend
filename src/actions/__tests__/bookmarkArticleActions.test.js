import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as types from "../actionTypes";
import * as bookmarkActions from "../bookmarkArticleActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const bookmarked = "Article bookmarked successfully.";
const unbookmarked = "Article was unbookmarked successfully.";
const allBookmarks = [
  {
    bookmark: "first bookmark"
  },
  {
    bookmark: "second bookmark"
  }
];

describe("bookmarking actions", () => {
  const store = mockStore({});
  it("returns a bookmarked action type ", () => {
    const expectedAction = {
      type: types.BOOKMARK_ARTICLE_SUCCESS,
      bookmarked
    };
    const actionsDispatched = store.dispatch(bookmarkActions.bookmarkArticleSuccess(bookmarked));
    expect(actionsDispatched.type).toEqual(expectedAction.type);
  });

  it("returns a unbookmarked action type ", () => {
    const expectedAction = {
      type: types.UN_BOOKMARK_ARTICLE_SUCCESS,
      unbookmarked
    };
    const actionsDispatched = store.dispatch(
      bookmarkActions.unBookmarkArticleSuccess(unbookmarked)
    );
    expect(actionsDispatched.type).toEqual(expectedAction.type);
  });

  it("returns a unbookmarked action failure type ", () => {
    const expectedAction = {
      type: types.UN_BOOKMARK_ARTICLE_FAILURE,
      unbookmarked
    };
    const actionsDispatched = store.dispatch(
      bookmarkActions.unBookmarkArticleFailure(unbookmarked)
    );
    expect(actionsDispatched.type).toEqual(expectedAction.type);
  });

  it("returns a bookmarked failure action type ", () => {
    const expectedAction = {
      type: types.BOOKMARK_ARTICLE_FAILURE,
      bookmarked
    };
    const actionsDispatched = store.dispatch(bookmarkActions.bookmarkArticleFailure(bookmarked));
    expect(actionsDispatched.type).toEqual(expectedAction.type);
  });

  it("returns a bookmarked action success message ", () => {
    const expectedAction = {
      type: types.BOOKMARK_ARTICLE_SUCCESS,
      bookmarked
    };
    const actionsDispatched = store.dispatch(bookmarkActions.bookmarkArticleSuccess(bookmarked));
    expect(actionsDispatched.data).toEqual(expectedAction.bookmarked);
  });

  it("returns a unbookmarked action success message ", () => {
    const expectedAction = {
      type: types.UN_BOOKMARK_ARTICLE_SUCCESS,
      unbookmarked
    };
    const actionsDispatched = store.dispatch(
      bookmarkActions.unBookmarkArticleSuccess(unbookmarked)
    );
    expect(actionsDispatched.data).toEqual(expectedAction.unbookmarked);
  });

  it("returns a bookmarked action failure message ", () => {
    const expectedAction = {
      type: types.BOOKMARK_ARTICLE_FAILURE,
      bookmarked
    };
    const actionsDispatched = store.dispatch(bookmarkActions.bookmarkArticleFailure(bookmarked));
    expect(actionsDispatched.data).toEqual(expectedAction.bookmarked);
  });

  it("returns a unbookmarked action failure message ", () => {
    const expectedAction = {
      type: types.UN_BOOKMARK_ARTICLE_FAILURE,
      unbookmarked
    };
    const actionsDispatched = store.dispatch(
      bookmarkActions.unBookmarkArticleFailure(unbookmarked)
    );
    expect(actionsDispatched.data).toEqual(expectedAction.unbookmarked);
  });

  it("returns all bookmarks ", () => {
    const expectedAction = {
      type: types.GET_ALL_BOOKMARKS_SUCCESS,
      allBookmarks
    };
    const actionsDispatched = store.dispatch(
      bookmarkActions.getBookmarkSuccess(allBookmarks)
    );
    expect(actionsDispatched.data).toEqual(expectedAction.allBookmarks);
  });
});
