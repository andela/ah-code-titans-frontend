/* eslint-disable consistent-return */
import axios from "axios";
import toastr from "toastr";

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNocmV3ZHR1cnRsZSIsInJlZnJlc2hfdG9rZW4iOmZhbHNlLCJpYXQiOjE1NDgzMjEyNTksIm5iZiI6MTU0ODMyMDk1OSwiZXhwIjoxNTQ4MzI0ODU5fQ.81yYnIZFShqvv8vCYGEzFfgZLhXAE4YaZCgaBg42GqU";
axios.defaults.headers.common.Authorization = token;

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-center",
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

export default class ArticleAPI {
  static createArticle(articleDetails) {
    const {
      // eslint-disable-next-line camelcase
      title, description, body, tag_list
    } = articleDetails;
    return axios.post("/api/articles/",
      {
        article: {
          title,
          description,
          body,
          tag_list: tag_list.split(",")
        }
      },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }).then((response) => {
      if (response) {
        window.location.assign(`/article/${response.data.slug}`);
        return { success: true, article: response.data };
      }
    }).catch((error) => {
      if (error.response) {
        toastr.warning("Please login to post an article");
        return { success: false, error: error.response.data };
      }
    });
  }

  static getSingleArticle(slug) {
    return axios.get(`/api/article/${slug}`, {}, { headers: { Authorization: `Token ${token}` } })
      .then(response => response.data)
      .catch(err => err);
  }
}
