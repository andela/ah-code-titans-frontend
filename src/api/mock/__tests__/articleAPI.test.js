// Test Article Mock API
import ArticleAPIMock from "../articleAPI";

describe("Article API Mock :", () => {
  it("should return a list of articles", () => {
    ArticleAPIMock.getAllArticles().then((response) => {
      expect(response.success).toEqual(true);
      expect(response.content.results.length).toBe(20);
    });
  });
});
