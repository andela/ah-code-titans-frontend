import axios from "axios";

export default class CommentsApi {
  static createComments(comment) {
    return axios
      .post(`/api/articles/${comment.slug}/comments`, {
        text: comment.comment,
        parent: 0
      })
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, data: response }));
  }

  static createReplyComment(comment) {
    return axios
      .post(`/api/articles/${comment.slug}/comments`, {
        text: comment.replyComment,
        parent: comment.id
      })
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, data: response }));
  }

  static getReplyComment(comment) {
    return axios
      .get(`/api/articles/${comment.slug}/comment/${comment.id}/0`)
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, data: response }));
  }

  static getComments(slug) {
    return axios
      .get(`/api/articles/${slug}/comments/0`)
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, data: response }));
  }

  static deleteComment(slug, commentId) {
    return axios
      .delete(`/api/articles/${slug}/comments/${commentId}`)
      .then((response) => {
        if (response) {
          return { success: true, data: response.data };
        }
      })
      .catch(response => ({ success: false, data: response }));
  }
}
