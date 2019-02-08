import configureStore from "redux-mock-store";
import * as types from "../actionTypes";
import * as ArticleActions from "../articleActions";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("Article actions: ", () => {
  let store = {};

  beforeAll(() => {
    store = mockStore({});
  });

  it("should dispatch CREATE_ARTICLE_SUCCESS type", () => {
    expect(store.dispatch(ArticleActions.createArticleSuccess({})).type)
      .toEqual(types.CREATE_ARTICLE_SUCCESS);
  });
  it("should dispatch GET_SPECIFIC_ARTICLE_SUCCESS type", () => {
    expect(store.dispatch(ArticleActions.getSpecificArticle({})).type)
      .toEqual(types.GET_SPECIFIC_ARTICLE_SUCCESS);
  });

  it("should dispatch DELETE_ARTICLE_SUCCESS type", () => {
    expect(store.dispatch(ArticleActions.deleteSpecificArticle({})).type)
      .toEqual(types.DELETE_ARTICLE_SUCCESS);
  });
  it("should dispatch EDIT_ARTICLE_SUCCESS type", () => {
    expect(store.dispatch(ArticleActions.editSpecificArticle({})).type)
      .toEqual(types.EDIT_ARTICLE_SUCCESS);
  });

  it("should dispatch RETRIEVE_ALL_ARTICLES_SUCCESS type", () => {
    expect(store.dispatch(ArticleActions.retrieveArticlesSuccess({})).type)
      .toEqual(types.RETRIEVE_ALL_ARTICLES_SUCCESS);
  });

  it("should dispatch RETRIEVE_ALL_ARTICLES_IS_LOADING type", () => {
    expect(store.dispatch(ArticleActions.retrieveArticlesIsLoading({})).type)
      .toEqual(types.RETRIEVE_ALL_ARTICLES_IS_LOADING);
  });

  it("should dispatch RETRIEVE_ALL_ARTICLES_FAILURE type", () => {
    expect(store.dispatch(ArticleActions.retrieveArticlesFailure({})).type)
      .toEqual(types.RETRIEVE_ALL_ARTICLES_FAILURE);
  });
});
