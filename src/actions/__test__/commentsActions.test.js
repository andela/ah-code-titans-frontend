import ConfigureStore from "redux-mock-store";
import * as Types from "../actionTypes";
import * as ActionCreators from "../commentsActions";

const middleware = [];
const mockStore = ConfigureStore(middleware);
describe("test suite for comments actions", () => {
  it("should create an action to create comments", () => {
    const store = mockStore({});

    const expectedAction = {
      type: Types.CREATE_COMMENT_SUCCESS
    };
    expect(store.dispatch(ActionCreators.createCommentSuccess())).toEqual(expectedAction);
  });

  it("should create an action to get comments success", () => {
    const store = mockStore({});
    const expectedAction = {
      type: Types.GET_ARTICLE_COMMENTS_SUCCESS
    };
    expect(store.dispatch(ActionCreators.getArticleCommentSuccess())).toEqual(expectedAction);
  });

  it("should create an action to return fetch of comments failure", () => {
    const store = mockStore({});

    const expectedAction = {
      type: Types.GET_ARTICLE_COMMENTS_FAILURE
    };
    expect(store.dispatch(ActionCreators.getArticleCommentFailure())).toEqual(expectedAction);
  });
});
