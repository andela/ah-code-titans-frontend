import instance from "./axiosConfig";

export default class bookmarkArticleApi {
  static bookmarkApi(slug) {
    return instance.post(`/api/article/${slug}/bookmark`)
      .then((response) => {
        if (response.status === 200) {
          return {
            content: response.data.message,
            success: true
          };
        }
      }).catch((err) => {
        if (err.response.status !== 200) {
          return {
            success: false,
            error: {
              status: err.response.status,
              data: err.response.data
            }
          };
        }
      });
  }

  static unBookmarkApi(slug) {
    return instance.delete(`/api/article/${slug}/bookmark`)
      .then((response) => {
        if (response.status === 204) {
          return {
            content: response.data.message,
            success: true
          };
        }
      }).catch((err) => {
        if (err.response.status !== 204) {
          return {
            success: false,
            error: {
              status: err.response.status,
              data: err.response.data
            }
          };
        }
      });
  }
}
