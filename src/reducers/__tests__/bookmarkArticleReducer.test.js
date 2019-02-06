import * as types from "../../actions/actionTypes";
import initialState from "../../store/initialState";
import bookmarkArticleReducer from "../bookmarkArticleReducer";

const bookmark = "bookmarked";
const allBookmarks = [
  {
    bookmark: "first bookmark"
  },
  {
    bookmark: "second bookmark"
  }
];

const testInitialState = initialState.bookmarkArticle.bookmark;

describe("reducer: ", () => {
  it("should return initial state", () => {
    expect(bookmarkArticleReducer(testInitialState, {})).toEqual(
      testInitialState
    );
  });

  it("should return bookmarked success message", () => {
    expect(
      bookmarkArticleReducer(testInitialState, {
        type: types.BOOKMARK_ARTICLE_SUCCESS,
        data: bookmark
      })
    ).toEqual({
      bookmark
    });
  });

  it("should return bookmarked failure message", () => {
    expect(
      bookmarkArticleReducer(testInitialState, {
        type: types.BOOKMARK_ARTICLE_FAILURE,
        data: bookmark
      })
    ).toEqual({
      bookmark
    });
  });

  it("should return unbookmarked success message", () => {
    expect(
      bookmarkArticleReducer(testInitialState, {
        type: types.UN_BOOKMARK_ARTICLE_SUCCESS,
        data: bookmark
      })
    ).toEqual({
      bookmark
    });
  });

  it("should return unbookmarked failure message", () => {
    expect(
      bookmarkArticleReducer(testInitialState, {
        type: types.BOOKMARK_ARTICLE_FAILURE,
        data: bookmark
      })
    ).toEqual({
      bookmark
    });
  });

  it("should return all bookmarked articles", () => {
    expect(
      bookmarkArticleReducer(initialState.bookmarkArticle, {
        type: types.GET_ALL_BOOKMARKS_SUCCESS,
        data: allBookmarks
      }).bookmarks
    ).toEqual(allBookmarks);
  });
});
