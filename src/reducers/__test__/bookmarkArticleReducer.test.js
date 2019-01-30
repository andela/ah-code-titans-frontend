import * as types from "../../actions/actionTypes";
import initialState from "../../store/initialState";
import bookmarkArticleReducer from "../bookmarkArticleReducer";

const bookmark = "bookmarked";

describe("reducer: ", () => {
  it("should return initial state", () => {
    expect(bookmarkArticleReducer(initialState.bookmarkedReducer, {})).toEqual(
      initialState.bookmarkedReducer
    );
  });

  it("should return bookmarked success message", () => {
    expect(
      bookmarkArticleReducer(initialState.bookmarkedReducer, {
        type: types.BOOKMARK_ARTICLE_SUCCESS,
        data: bookmark
      })
    ).toEqual({
      bookmark
    });
  });

  it("should return bookmarked failure message", () => {
    expect(
      bookmarkArticleReducer(initialState.bookmarkedReducer, {
        type: types.BOOKMARK_ARTICLE_FAILURE,
        data: bookmark
      })
    ).toEqual({
      bookmark
    });
  });

  it("should return unbookmarked success message", () => {
    expect(
      bookmarkArticleReducer(initialState.bookmarkedReducer, {
        type: types.UN_BOOKMARK_ARTICLE_SUCCESS,
        data: bookmark
      })
    ).toEqual({
      bookmark
    });
  });

  it("should return unbookmarked failure message", () => {
    expect(
      bookmarkArticleReducer(initialState.bookmarkedReducer, {
        type: types.BOOKMARK_ARTICLE_FAILURE,
        data: bookmark
      })
    ).toEqual({
      bookmark
    });
  });
});
