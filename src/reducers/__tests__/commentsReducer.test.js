import commentReducer from "../commentReducer";
import * as Types from "../../actions/actionTypes";

describe("test suite for comments reducers", () => {
  it("should handle return default state ", () => {
    expect(commentReducer({}, {})).toEqual({});
  });

  it("should handle get article comment success ", () => {
    expect(
      commentReducer(
        {
          comments: []
        },
        {
          type: Types.GET_ARTICLE_COMMENTS_SUCCESS,
          payload: {
            comments: ["comment success"],
            reset: 0
          }
        }
      )
    ).toEqual({ comments: ["comment success"], hasMore: true, mainOffset: undefined });
  });

  it("should handle get reply comment success ", () => {
    expect(
      commentReducer(
        {
          comments: []
        },
        {
          type: Types.GET_REPLY_COMMENT_SUCCESS,
          payload: {
            comments: ["comment success"],
            parentId: 1,
            offset: 0,
            reset: false
          }
        }
      )
    ).toEqual({ comments: ["comment success"] });
  });

  it("should handle get reply comment success ", () => {
    expect(
      commentReducer(
        {
          comments: []
        },
        {
          type: Types.GET_REPLY_COMMENT_SUCCESS,
          payload: {
            comments: ["comment success"],
            parentId: 1,
            offset: 0,
            reset: false
          }
        }
      )
    ).toEqual({ comments: ["comment success"] });
  });

  it("should handle get reply comment failure ", () => {
    expect(
      commentReducer(
        {
          comments: []
        },
        {
          type: Types.GET_REPLY_COMMENT_FAILURE,
          payload: {
            comments: []
          }
        }
      )
    ).toEqual({ comments: [] });
  });
});
