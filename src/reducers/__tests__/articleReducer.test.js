// test login reducer
import * as types from "../../actions/actionTypes";
import articleReducer from "../articleReducer";
import { article } from "../../api/mock/articleAPI";
import initialState from "../../store/initialState";

describe("Article Reducer :", () => {
  const articlesPayload = {
    section: "landingSection",
    content: {
      results: [article, article],
      next: "",
      previous: ""
    },
    reset: false
  };

  const newArticle = {
    title: "The Avengers",
    description: "A Marvel article",
    body: "End Game is coming soon",
    tag_list: ["Avengers", "Marvel"]
  };

  const state = {
    articles: {
      landingSection: {
        next: "",
        previous: "",
        isLoading: false,
        results: [article]
      },
      topStoriesSection: {
        next: "",
        previous: "",
        isLoading: false,
        results: []
      },
      recentStoriesSection: {
        next: "",
        previous: "",
        isLoading: false,
        results: []
      }
    }
  };

  it("should return the initial state by default ", () => {
    expect(articleReducer(state, {})).toEqual(state);
  });

  it("should handle RETRIEVE_ALL_ARTICLES_SUCCESS without using reset", () => {
    const result = articleReducer(state, {
      type: types.RETRIEVE_ALL_ARTICLES_SUCCESS,
      data: articlesPayload
    });

    state.articles[articlesPayload.section].results = [
      ...state.articles[articlesPayload.section].results,
      ...articlesPayload.content.results
    ];
    state.articles[articlesPayload.section].more = true;

    expect(
      result.articles[articlesPayload.section].results.length
    ).toBe(
      state.articles[articlesPayload.section].results.length
    );
    expect(result).toEqual(state);
  });

  it("should handle RETRIEVE_ALL_ARTICLES_SUCCESS using reset", () => {
    articlesPayload.content.reset = true;
    const result = articleReducer(state, {
      type: types.RETRIEVE_ALL_ARTICLES_SUCCESS,
      data: articlesPayload
    });

    state.articles[articlesPayload.section].more = true;

    expect(
      result.articles[articlesPayload.section].results.length
    ).toBe(
      articlesPayload.content.results.length
    );
  });

  it("should handle RETRIEVE_ALL_ARTICLES_FAILURE ", () => {
    const result = articleReducer(state, {
      type: types.RETRIEVE_ALL_ARTICLES_FAILURE,
      data: articlesPayload
    });
    state.articles[articlesPayload.section].more = false;

    expect(
      result.articles[articlesPayload.section].results.length
    ).toBe(
      state.articles[articlesPayload.section].results.length
    );
    expect(result).toEqual(state);
  });

  it("should provide the initial state", () => {
    expect(articleReducer(initialState.article, {})).toEqual(initialState.article);
  });
  it("should add a new article", () => {
    expect(articleReducer(initialState.articles,
      { type: types.CREATE_ARTICLE_SUCCESS, payload: newArticle }).article).toEqual(newArticle);
  });
  it("should add a specific article", () => {
    expect(articleReducer(initialState.singleArticle,
      { type: types.GET_SPECIFIC_ARTICLE_SUCCESS, payload: newArticle })
      .singleArticle).toEqual(newArticle);
  });
});
