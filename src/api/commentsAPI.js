/* eslint-disable consistent-return */
import instance from "./axiosConfig";

export default class CommentsApi {
  static createComments(comment) {
    return instance
      .post(`/api/articles/${comment.articleSlug}/comments`, {
        text: comment.comment,
        parent: 0
      })
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, error: { status: response.response.status } }));
  }

  static createReplyComment(comment) {
    return instance
      .post(`/api/articles/${comment.slug}/comments`, {
        text: comment.replyComment,
        parent: comment.id
      })
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, error: { status: response.response.status } }));
  }

  static getReplyComment(comment) {
    return instance
      .get(`/api/articles/${comment.slug}/comment/${comment.comment.id}/0`)
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, data: response }));
  }

  static getComments(slug, offset) {
    return instance
      .get(`/api/articles/${slug}/comments/${offset}`)
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, error: { status: response.response.status } }));
  }

  static deleteComment(slug, commentId) {
    return instance
      .delete(`/api/articles/${slug}/comments/${commentId}`)
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, data: response }));
  }
}
