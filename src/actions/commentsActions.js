import * as types from "./actionTypes";
import CommentsApi from "../api/commentsAPI";

export const getArticleCommentSuccess = payload => ({
  type: types.GET_ARTICLE_COMMENTS_SUCCESS,
  payload
});

export const createCommentSuccess = comment => ({
  type: types.CREATE_ARTICLE_SUCCESS,
  comment
});

export const getReplyCommentSuccess = comment => ({
  type: types.GET_REPLY_COMMENT_SUCCESS,
  comment
});

export const getComments = slug => (dispatch) => {
  CommentsApi.getComments(slug).then((response) => {
    if (response.success) {
      dispatch(getArticleCommentSuccess(response.data));
    }
  });
};

export const getReplyComment = comment => (dispatch) => {
  CommentsApi.getReplyComment(comment).then((response) => {
    if (response.success) {
      dispatch(getReplyCommentSuccess(response.data));
    }
  });
};

export const deleteComment = (slug, commentId) => (dispatch) => {};

export const createComment = comment => (dispatch) => {
  CommentsApi.createComments(comment).then((response) => {
    if (response.success) {
      dispatch(createCommentSuccess(comment.comment));
      dispatch(getComments(comment.slug));
    }
  });
};

export const createReplyComment = comment => (dispatch) => {
  CommentsApi.createReplyComment(comment).then((response) => {});
};
