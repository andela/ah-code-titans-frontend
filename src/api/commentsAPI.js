/* eslint-disable consistent-return */
import { axiosProtected } from "./axiosConfig";

export default class CommentsApi {
  static createComments(comment) {
    return axiosProtected
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
    return axiosProtected
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
    return axiosProtected
      .get(`/api/articles/${comment.slug}/comment/${comment.id}/0`)
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, data: response }));
  }

  static getComments(slug, offset) {
    return axiosProtected
      .get(`/api/articles/${slug}/comments/${offset}`)
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, error: { status: response.response.status } }));
  }

  // delete comment section
  static deleteComment(comment) {
    return axiosProtected
      .delete(`/api/articles/${comment.slug}/comment/${comment.id}`)
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, error: response }));
  }

  // update comment section
  static updateComment(comment) {
    return axiosProtected
      .put(`/api/articles/${comment.slug}/comment/${comment.id}`, {
        text: comment.replyComment
      })
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, error: response }));
  }
}
