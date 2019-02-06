import ArticleAPI from "../articleAPI";

describe("Article API: ", () => {
  beforeAll(() => {
    process.env.API_MOCK = false;
  });

  it("should return a list of articles", () => {
    ArticleAPI.getAllArticles("").then((response) => {
      expect(response.success).toEqual(true);
      expect(response.content.results.length).toBe(20);
    });
  });

  it("should return 404 error with an error message", () => {
    ArticleAPI.getAllArticles("api/invalid").then((response) => {
      expect(response.success).toEqual(false);
      expect(response.error.status).toBe(404);
    });
  });
});
