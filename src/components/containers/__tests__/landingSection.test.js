import React from "react";
import objectAssign from "object-assign";
import LandingSection from "../landingSection";
import { setup } from "../../../setupTests";
import { article } from "../../../api/mock/articleAPI";
import initialState from "../../../store/initialState";

describe("Recent Stories Section :", () => {
  beforeAll(() => {
    process.env.API_MOCK = false;
  });

  it("renders without crashing", () => {
    const { enzymeWrapper } = setup(<LandingSection />);
    expect(enzymeWrapper).not.toBe(undefined);
  });

  it("renders to check if each slide renders 3 articles", () => {
    const articleState = objectAssign({}, initialState.article);
    const articles = [];

    for (let index = 1; index <= 10; index += 1) {
      articles.push(article);
    }

    articleState.articles.landingSection.results = articles;

    expect(articleState.articles.landingSection.results.length).toBe(10);

    const { enzymeWrapper } = setup(<LandingSection />, { article: articleState });
    const articlesWrapper = enzymeWrapper.find(".slick-slide");

    expect(articlesWrapper.at(1).find(".item.article--1").length).toBe(3);
  });
});
