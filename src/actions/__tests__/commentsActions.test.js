import ConfigureStore from "redux-mock-store";
import * as Types from "../actionTypes";
import * as ActionCreators from "../commentsActions";

const middleware = [];
const mockStore = ConfigureStore(middleware);
describe("test suite for comments actions", () => {
  const store = mockStore({});
  it("should create an action to create comments", () => {
    const expectedAction = {
      type: Types.CREATE_COMMENT_SUCCESS
    };
    expect(store.dispatch(ActionCreators.createCommentSuccess())).toEqual(expectedAction);
  });

  it("should create an action to get comments success", () => {
    const expectedAction = {
      type: Types.GET_ARTICLE_COMMENTS_SUCCESS
    };
    expect(store.dispatch(ActionCreators.getArticleCommentSuccess())).toEqual(expectedAction);
  });

  it("should create an action to return fetch of comments failure", () => {
    const expectedAction = {
      type: Types.GET_ARTICLE_COMMENTS_FAILURE
    };
    expect(store.dispatch(ActionCreators.getArticleCommentFailure())).toEqual(expectedAction);
  });

  it("should create an action to return reply of comments ", () => {
    const expectedAction = {
      type: Types.GET_REPLY_COMMENT_SUCCESS
    };
    expect(store.dispatch(ActionCreators.getReplyCommentSuccess())).toEqual(expectedAction);
  });

  it("should create an action to return reply of comments failure", () => {
    const expectedAction = {
      type: Types.GET_REPLY_COMMENT_FAILURE
    };
    expect(store.dispatch(ActionCreators.getReplyCommentFailure())).toEqual(expectedAction);
  });
});
