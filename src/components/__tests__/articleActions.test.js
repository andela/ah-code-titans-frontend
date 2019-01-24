import {
  GET_SPECIFIC_ARTICLE_SUCCESS,
  CREATE_ARTICLE_SUCCESS
} from "../../actions/actionTypes";
import {
  createArticleSuccess,
  getSpecificArticle
} from "../../actions/articlesActions";

describe("action creators", () => {
  it("should dispatch CREATE_ARTICLE_SUCCESS type", () => {
    expect(createArticleSuccess({}).type).toEqual(CREATE_ARTICLE_SUCCESS);
  });
  it("should dispatch GET_SPECIFIC_ARTICLE_SUCCESS type", () => {
    expect(getSpecificArticle({}).type).toEqual(GET_SPECIFIC_ARTICLE_SUCCESS);
  });
});
