import * as types from "../../actions/actionTypes";
import initialState from "../../store/initialState";
import rateArticleReducer from "../rateArticleReducer";

const data = {
  "Rated at": 5
};

describe("Rate article reducer: ", () => {
  it("should return initial state", () => {
    expect(rateArticleReducer(initialState.rateArticle, {})).toEqual(
      initialState.rateArticle
    );
  });

  it("should return fetched average rate", () => {
    expect(
      rateArticleReducer(initialState.rateArticle, {
        type: types.GET_ARTICLE_RATING_SUCCESS,
        data
      }).rating
    ).toEqual(data);
  });

  it("should return post a rate", () => {
    expect(
      rateArticleReducer(initialState.rateArticle, {
        type: types.RATE_ARTICLE_SUCCESS,
        data
      }).rating
    ).toEqual(data);
  });
});
