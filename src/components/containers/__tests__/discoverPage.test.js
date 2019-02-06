import React from "react";
import objectAssign from "object-assign";

import { setup } from "../../../setupTests";
import { article } from "../../../api/mock/articleAPI";
import initialState from "../../../store/initialState";
import DiscoverPage from "../discoverPage";

describe("Discover Page :", () => {
  const props = {
    location: {
      search: {}
    },
    articles: {
      next: "",
      isLoading: false,
      results: []
    },
    actions: {
      auth: {
        searchForArticlesByTag: username => username,
        searchForArticles: username => username,
        getArticles: (articlesSection, reset = false) => true
      }
    }
  };

  const articleState = objectAssign({}, initialState.article);
  const articles = [];

  for (let index = 1; index <= 20; index += 1) {
    articles.push(article);
  }

  articleState.articles.mainDiscoverSection.results = articles;

  it("renders common tags list", () => {
    const { enzymeWrapper } = setup(<DiscoverPage {...props} />);
    const commonTags = enzymeWrapper.find(".discoverPage__tags span");
    expect(commonTags.length).toBe(19);
  });

  it("renders articles filter successfully", () => {
    const { enzymeWrapper } = setup(<DiscoverPage {...props} />, { article: articleState });

    const filterTags = enzymeWrapper.find(".aFilter__tags button");
    expect(filterTags.length).toBe(2);

    const filterAuthors = enzymeWrapper.find(".aFilter__authors button");
    expect(filterAuthors.length).toBe(1);
    expect(filterAuthors.at(0).text()).toBe(articles[0].author.username);
  });
});
