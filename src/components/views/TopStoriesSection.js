/* eslint-disable prefer-const */
/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { Header, Container, Item } from "semantic-ui-react";

import Article from "../containers/articles/article2";

export default function TopStoriesSectionView(props) {
  const { articles } = props;
  let stories = [];

  for (let index = 0; index <= 4 && articles[index] !== undefined; index += 1) {
    stories.push(articles[index]);
  }

  return (
    <Container>
      <Header as="h2">Top Articles</Header>
      <Item.Group>
        {stories.map((article, i) => (<Article article={article} key={`${i}-${article.id}`} />))}
      </Item.Group>
    </Container>
  );
}

TopStoriesSectionView.propTypes = {
  articles: PropTypes.array.isRequired
};
