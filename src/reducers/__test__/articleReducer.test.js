import articlesReducers from "../articleReducer";
import initialState from "../../store/initialState";

import {
  GET_SPECIFIC_ARTICLE_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_SUCCESS,
  EDIT_ARTICLE_SUCCESS
} from "../../actions/actionTypes";

const newArticle = {
  title: "The Avengers",
  description: "A Marvel article",
  body: "End Game is coming soon",
  tag_list: ["Avengers", "Marvel"]
};

describe("article reducer", () => {
  it("should provide the initial state", () => {
    expect(articlesReducers(initialState.article, {})).toEqual(initialState.article);
  });
  it("should add a new article", () => {
    expect(articlesReducers(initialState.articles,
      { type: CREATE_ARTICLE_SUCCESS, payload: newArticle }).article).toEqual(newArticle);
  });
  it("should add a specific article", () => {
    expect(articlesReducers(initialState.singleArticle,
      { type: GET_SPECIFIC_ARTICLE_SUCCESS, payload: newArticle })
      .singleArticle).toEqual(newArticle);
  });
  it("should add an edited article", () => {
    expect(articlesReducers(initialState.editedArticle,
      { type: EDIT_ARTICLE_SUCCESS, payload: newArticle })
      .editedArticle).toEqual(newArticle);
  });
  it("should add a deleted article", () => {
    expect(articlesReducers(initialState.deletedArticle,
      { type: DELETE_ARTICLE_SUCCESS, payload: newArticle })
      .deletedArticle).toEqual(newArticle);
  });
});
