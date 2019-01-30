// test login reducer
import * as types from "../../actions/actionTypes";
import articleReducer from "../articleReducer";
import { article } from "../../api/mock/articleAPI";

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

  const state = {
    articles: {
      landingSection: {
        next: "",
        previous: "",
        results: [article]
      },
      topStoriesSection: {
        next: "",
        previous: "",
        results: []
      },
      recentStoriesSection: {
        next: "",
        previous: "",
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
});
