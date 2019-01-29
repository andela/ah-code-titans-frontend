import instance from "./axiosConfig";
import toastr from "../helpers/toastrConfig";

export default class rateArticleApi {
  static rateArticle(rated, slug) {
    return instance
      .post(
        `/api/article/${slug}/rate`,
        {
          article: {
            rate: rated
          }
        }
      )
      .then((response) => {
        if (response.status === 201) {
          return { success: true, articleRating: response.data };
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toastr.error("AN error occured try again");
          return {
            content: err.response.data
          };
        }
        if (err.response.status === 401) {
          toastr.error("Please login to get average rates on the article");
          return {
            content: err.response.data
          };
        }
      });
  }

  static getArticleRate(slug) {
    return instance
      .get(`/api/article/${slug}/rating`)
      .then((response) => {
        if (response.status === 200) {
          return { success: true, articleRating: response.data["Rated at"] };
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toastr.error("An error occured try again");
          return {
            content: err.response.data
          };
        }
        if (err.response.status === 401) {
          toastr.error("Please login to rate the article");
          return {
            content: err.response.data
          };
        }
        if (err.response.status === 404) {
          toastr.error("Articte was not found");
          return {
            content: err.response.data
          };
        }
      });
  }
}
