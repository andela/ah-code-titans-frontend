import * as types from "./actionTypes";
import toastr from "../helpers/toastrConfig";
import CommentsApi from "../api/commentsAPI";
import { checkIfUnauthorized } from "./authenticationActions";

export const getArticleCommentSuccess = payload => ({
  type: types.GET_ARTICLE_COMMENTS_SUCCESS,
  payload
});

export const getArticleCommentFailure = payload => ({
  type: types.GET_ARTICLE_COMMENTS_FAILURE,
  payload
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

export const deleteCommentSuccess = payload => ({
  type: types.DELETE_COMMENT_SUCCESS,
  payload
});

export const getReplyComment = (comment, reset = false) => (dispatch) => {
  CommentsApi.getReplyComment({ slug: comment.slug, id: comment.id }).then((response) => {
    if (response.success) {
      dispatch(
        getReplyCommentSuccess({
          comments: response.data.comments,
          parentId: comment.id,
          offset: response.data.offset,
          reset
        })
      );
    } else if (response.data.response.status === 404) {
      dispatch(getReplyCommentFailure({ parentId: comment.id, reset }));
    }
  });
};

export const getComments = (slug, reset = false) => (dispatch, getState) => {
  const offset = getState().comment.mainOffset.next;
  CommentsApi.getComments(slug, reset ? 0 : offset).then((response) => {
    response.data = { ...response.data, reset };
    if (response.success) {
      dispatch(getArticleCommentSuccess(response.data));
      response.data.comments.map((comment) => {
        dispatch(getReplyComment({ slug, id: comment.id }));
      });
    } else if (response.error.status === 404) {
      dispatch(getArticleCommentFailure({ reset }));
    }
  });
};

export const updateComment = comment => (dispatch) => {
  CommentsApi.updateComment(comment).then((response) => {
    if (response.success) {
      if (comment.parent === 0) {
        dispatch(getComments(comment.slug, true));
      } else {
        dispatch(getReplyComment({ slug: comment.slug, id: comment.parent }, true));
      }
    }
  });
};

export const deleteComment = comment => (dispatch) => {
  CommentsApi.deleteComment(comment).then((response) => {
    if (response.success) {
      if (comment.parent === 0) {
        dispatch(deleteCommentSuccess({ id: comment.id }));
      } else {
        dispatch(deleteCommentSuccess({ id: comment.id }));
      }
    }
  });
};

export const createComment = comment => (dispatch) => {
  CommentsApi.createComments(comment).then((response) => {
    if (response.success) {
      dispatch(getComments(comment.articleSlug, true));
    } else {
      checkIfUnauthorized(response, dispatch, () => {
        dispatch(createComment(comment));
      });
      toastr.error("Please login to comment on the article");
    }
  });
};

export const createReplyComment = comment => (dispatch) => {
  CommentsApi.createReplyComment(comment).then((response) => {
    if (response.success) {
      dispatch(getReplyComment({ slug: comment.slug, id: comment.id }, true));
    } else if (response.error.status === 401) {
      toastr.error("Please login to reply on this comment");
    }
  });
};
