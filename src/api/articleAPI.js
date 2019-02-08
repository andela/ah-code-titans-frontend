/* eslint-disable consistent-return */
import { MOCK } from "./config";
import { axiosProtected } from "./axiosConfig";
import toastr from "../helpers/toastrConfig";
import articleAPIMock from "./mock/articleAPI";

export default class ArticleAPI {
  static createArticle(articleDetails) {
    const {
      // eslint-disable-next-line camelcase
      title, description, body, tag_list, image
    } = articleDetails;
    return axiosProtected.post("/api/articles/",
      {
        article: {
          title,
          image,
          description,
          body,
          tag_list: tag_list.split(",")
        }
      }).then((response) => {
      if (response.status === 200) {
        // window.location.assign(`/article/${response.data.slug}`);
        return {
          success: true,
          article: response.data
        };
      }
    }).catch((error) => {
      if (error.response) {
        toastr.warning("Please login to post an article");
        return {
          success: false,
          error: error.response.data
        };
      }
    });
  }

  static getSingleArticle(slug) {
    return axiosProtected.get(`/api/article/${slug}`, {})
      .then(response => ({
        success: true,
        content: response.data.articles
      }))
      .catch((response) => {
        if (response.response.status !== 200) {
          toastr.error("Article was not found");
          setTimeout(() => { window.location.assign("/profile"); }, 1000);
          return {
            success: false,
            error: {
              message: "Article was not found!"
            }
          };
        }
      });
  }

  static getAllArticles(link) {
    if (MOCK) return articleAPIMock.getAllArticles();

    return axiosProtected.get(link === "" ? "/api/articles/all" : link)
      .then((response) => {
        if (response.status === 200) {
          return {
            success: true,
            content: response.data.articles === undefined ? response.data : response.data.articles
          };
        }
      })
      .catch((response) => {
        if (response.response === undefined || response.response.status !== 200) {
          return {
            success: false,
            error: {
              status: response.response !== undefined ? response.response.status : 500,
              message: "Failed to retrieve articles!"
            }
          };
        }
      });
  }

  static deleteArticle(slug) {
    return axiosProtected.delete(`/api/article/${slug}`)
      .then((response) => {
        toastr.success("Article has been deleted.");
        setTimeout(() => {
          window.location.assign("/profile");
        }, 2000);
        return {
          success: true,
          content: response.date.article
        };
      })
      .catch(error => ({
        success: false,
        error: {
          message: "Article was deleted",
          status: error.response.status
        }
      }));
  }

  static editArticle(slug, articleDetails) {
    const {
      // eslint-disable-next-line camelcase
      title, description, body, tag_list
    } = articleDetails;
    return axiosProtected.put(`/api/article/${slug}`,
      {
        article: {
          title,
          description,
          body,
          tag_list
        }
      }).then((response) => {
      if (response) {
        toastr.success("Article details updated");
        setTimeout(() => {
          window.location.assign(`/article/${response.data.articles.article.slug}`);
        }, 2000);
        return {
          success: true,
          article: response.data
        };
      }
    }).catch((error) => {
      if (error.response) {
        toastr.warning("An error occurred. Please try again");
        return {
          success: false,
          error: {
            status: error.response.status
          }
        };
      }
    });
  }
}
