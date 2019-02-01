import configureStore from "redux-mock-store";
import {
  GET_SPECIFIC_ARTICLE_SUCCESS,
  CREATE_ARTICLE_SUCCESS
} from "../actionTypes";
import {
  createArticleSuccess,
  getSpecificArticle
} from "../articleActions";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("action creators", () => {
  it("should dispatch CREATE_ARTICLE_SUCCESS type", () => {
    const store = mockStore({});
    expect(store.dispatch(createArticleSuccess({})).type).toEqual(CREATE_ARTICLE_SUCCESS);
  });
  it("should dispatch GET_SPECIFIC_ARTICLE_SUCCESS type", () => {
    const store = mockStore({});
    expect(store.dispatch(getSpecificArticle({})).type).toEqual(GET_SPECIFIC_ARTICLE_SUCCESS);
  });
});
