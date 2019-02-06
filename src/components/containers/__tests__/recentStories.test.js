import React from "react";
import objectAssign from "object-assign";
import RecentStoriesSection from "../recentStoriesSection";
import { setup } from "../../../setupTests";
import { article } from "../../../api/mock/articleAPI";
import initialState from "../../../store/initialState";

describe("Recent Stories Section :", () => {
  beforeAll(() => {
    process.env.API_MOCK = false;
  });

  it("renders without crashing", () => {
    const { enzymeWrapper } = setup(<RecentStoriesSection />);
    expect(enzymeWrapper).not.toBe(undefined);
  });

  it("renders initial set of articles", () => {
    const articleState = objectAssign({}, initialState.article);
    const articles = [];

    for (let index = 1; index <= 20; index += 1) {
      articles.push(article);
    }

    articleState.articles.recentStoriesSection.results = articles;

    expect(articleState.articles.recentStoriesSection.results.length).toBe(20);

    const { enzymeWrapper } = setup(<RecentStoriesSection />, { article: articleState });
    const articlesWrapper = enzymeWrapper.find(".item.article--2");

    expect(articlesWrapper.length).toBe(20);
  });
});
