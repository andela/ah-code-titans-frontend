import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as types from "../actionTypes";
import * as actionCreators from "../rateArticleActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

// test action creators
describe("get average rates action", () => {
  it("should return a get action", () => {
    const data = "rate";
    const expectedAction = {
      type: types.GET_ARTICLE_RATING_SUCCESS,
      data
    };
    const actionsDispatched = store.dispatch(actionCreators.getArticleRateSuccess(data));
    expect(actionsDispatched).toEqual(expectedAction);
  });
  it("should return a get action type", () => {
    const data = "rate";
    const expectedAction = {
      type: types.GET_ARTICLE_RATING_SUCCESS,
      data
    };
    const actionsDispatched = store.dispatch(actionCreators.getArticleRateSuccess(data));
    expect(actionsDispatched.type).toEqual(expectedAction.type);
  });
  it("should return a post action", () => {
    const data = "rate";
    const expectedAction = {
      type: types.RATE_ARTICLE_SUCCESS,
      data
    };
    const actionsDispatched = store.dispatch(actionCreators.rateArticleSuccess(data));
    expect(actionsDispatched).toEqual(expectedAction);
  });
  it("should return a post action type", () => {
    const data = "rate";
    const expectedAction = {
      type: types.RATE_ARTICLE_SUCCESS,
      data
    };
    const actionsDispatched = store.dispatch(actionCreators.rateArticleSuccess(data));
    expect(actionsDispatched.type).toEqual(expectedAction.type);
  });
});
