/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-this-in-sfc */
import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

import {
  Header, Container, Item, Loader
} from "semantic-ui-react";

import Article from "../containers/articles/article2";

export default function RecentStoriesSectionView(props) {
  const { articles, hasMore, parent } = props;

  return (
    <Container>
      <Header as="h2">Recent Articles</Header>
      <div className="recentStories" ref={(ref) => { parent.scrollParentRef = ref; }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={parent.loadMore}
          hasMore={hasMore}
          loader={(
            <Container textAlign="center" key={0}>
              <Loader size="medium" active inline />
            </Container>
            )}
          useWindow={false}
          getScrollParent={() => parent.scrollParentRef}
        >
          <Item.Group>
            {articles.map((article, i) => (<Article article={article} key={`${i}-${article.id}`} />))}
          </Item.Group>
        </InfiniteScroll>
      </div>
    </Container>
  );
}

RecentStoriesSectionView.propTypes = {
  articles: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  parent: PropTypes.object.isRequired
};
