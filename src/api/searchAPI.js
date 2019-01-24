import instance from "./axiosConfig";

export default class TagSearchingAPI {
  static searchByTag(tagName) {
    return instance.get(`/api/tag/articles/?tags=${tagName}`)
      // eslint-disable-next-line consistent-return
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/discover";
          return { data: response.data.results };
        }
      });
  }
}
