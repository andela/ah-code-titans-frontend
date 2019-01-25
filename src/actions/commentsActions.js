import * as types from "./actionTypes";
import CommentsApi from "../api/commentsAPI";

export const getArticleCommentSuccess = payload => ({
  type: types.GET_ARTICLE_COMMENTS_SUCCESS,
  payload
});

export const getArticleCommentFailure = () => ({
  type: types.GET_ARTICLE_COMMENTS_FAILURE
});

export const createCommentSuccess = comment => ({
  type: types.CREATE_COMMENT_SUCCESS,
  comment
});

export const getReplyCommentSuccess = payload => ({
  type: types.GET_REPLY_COMMENT_SUCCESS,
  payload
});

export const getReplyCommentFailure = payload => ({
  type: types.GET_REPLY_COMMENT_FAILURE,
  payload
});

export const getComments = (slug, reset = false) => (dispatch, getState) => {
  const offset = getState().commentReducers.mainOffset.next;
  CommentsApi.getComments(slug, reset ? 0 : offset).then((response) => {
    response.data = { ...response.data, reset };
    if (response.success) {
      dispatch(getArticleCommentSuccess(response.data));
    } else if (response.error.status === 404) {
      dispatch(getArticleCommentFailure());
    }
  });
};

export const getReplyComment = (comment, reset = false) => (dispatch) => {
  CommentsApi.getReplyComment(comment).then((response) => {
    if (response.success) {
      dispatch(
        getReplyCommentSuccess({
          comments: response.data.comments,
          parentId: comment.comment.id,
          offset: response.data.offset,
          reset
        })
      );
    } else if (response.data.status === 404) {
      dispatch(getReplyCommentFailure({ parentId: comment.comment.id }));
    }
  });
};

export const createComment = comment => (dispatch) => {
  CommentsApi.createComments(comment).then((response) => {
    if (response.success) {
      dispatch(getComments(comment.articleSlug, true));
    }
  });
};

export const createReplyComment = comment => (dispatch) => {
  CommentsApi.createReplyComment(comment).then((response) => {
    if (response.success) {
      dispatch(getReplyComment({ slug: comment.slug, comment }, true));
    }
  });
};
