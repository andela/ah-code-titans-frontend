import React from "react";
import objectAssign from "object-assign";
import TopStoriesSection from "../topStoriesSection";
import { setup } from "../../../setupTests";
import { article } from "../../../api/mock/articleAPI";
import initialState from "../../../store/initialState";

describe("Recent Stories Section :", () => {
  it("renders without crashing", () => {
    const { enzymeWrapper } = setup(<TopStoriesSection />);
    expect(enzymeWrapper).not.toBe(undefined);
  });

  it("renders initial set of articles", () => {
    const articleState = objectAssign({}, initialState.article);
    const articles = [];

    for (let index = 1; index <= 10; index += 1) {
      articles.push(article);
    }

    articleState.articles.topStoriesSection.results = articles;

    expect(articleState.articles.topStoriesSection.results.length).toBe(10);

    const { enzymeWrapper } = setup(<TopStoriesSection />, { article: articleState });
    const articlesWrapper = enzymeWrapper.find(".item.article--2");

    expect(articlesWrapper.length).toBe(5);
  });
});
