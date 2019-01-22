/* eslint-disable consistent-return */
import { MOCK } from "./config";
import axios from "./axiosConfig";
import articleAPIMock from "./mock/articleAPI";

export default class ArticleAPI {
  static getAllArticles(link) {
    if (MOCK) return articleAPIMock.getAllArticles();

    return axios.get(link === "" ? "/api/articles/all" : link)
      .then((response) => {
        if (response.status === 200) {
          return {
            success: true,
            content: response.data.articles
          };
        }
      })
      .catch((response) => {
        if (response.response.status !== 200) {
          return {
            success: false,
            error: {
              message: "Failed to retrieve articles!",
              status: response.response.status
            }
          };
        }
      });
  }
}
