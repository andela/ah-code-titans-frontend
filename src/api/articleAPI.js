export default class ArticleAPI {
  static getArticles() {
    fetch("api/articles/all")
      .then((response) => {
        console.log(response);
      }).catch((response) => {
        console.log(response);
      });
  }
}
