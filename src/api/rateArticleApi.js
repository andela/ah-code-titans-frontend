import axios from "axios";
import instance from "./axiosConfig";

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRlbm8iLCJyZWZyZXNoX3Rva2VuIjpmYWxzZSwiaWF0IjoxNTQ4MzE0MTM5LCJuYmYiOjE1NDgzMTM4MzksImV4cCI6MTU0ODMxNzczOX0.fdVW4OCkvWHSJGErQKHStQTqLZB4y1JEpt9W1qICqgA";

axios.defaults.headers.common.Authorization = token;

export default class rateArticleApi {
  static rateArticle(rated) {
    return instance
      .post(
        "/api/article/javascript-es6/rate",
        {
          article: {
            rate: rated
          }
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      .then((response) => {
        if (response.status === 201) {
          return { success: true, articleRating: response.data };
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  static getArticleRate() {
    return instance
      .get("/api/article/javascript-es6/rating", {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then((response) => {
        if (response.status === 200) {
          return { success: true, articleRating: response.data["Rated at"] };
        }
      })
      .catch((err) => {
        throw err;
      });
  }
}
