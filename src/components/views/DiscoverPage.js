import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import {
  Item,
  Container,
  Loader,
  Header
} from "semantic-ui-react";
import cuid from "cuid";

import Article from "./articles/article2";
import TagSection from "./TagSection";
import SearchInput from "../containers/searchInput";
import ArticlesFilter from "./ArticlesFilter";

function DiscoverPageView(props) {
  const {
    articles, parent, hasMore, searchIsLoading
  } = props;

  return (
    <div className="discoverPage">
      <div className="discoverPage__tags SB">
        <TagSection {...props} />
      </div>
      <br />
      <br />
      <div className="discoverPage__search">
        <SearchInput
          onKeyPress={parent.onSearchSubmit}
          alwaysActive
          size="huge"
          isLoading={searchIsLoading}
        />
      </div>
      <div className="discoverPage__filter">
        <ArticlesFilter parent={parent} />
      </div>
      <div className="discoverPage__content">
        <InfiniteScroll
          pageStart={0}
          loadMore={parent.loadMore}
          hasMore={hasMore}
          loader={(
            <Container textAlign="center" key={0}>
              <Loader size="medium" active inline />
            </Container>
          )}
        >
          <Item.Group key={cuid()}>
            {
              articles.length > 0
                ? articles.map(article => (
                  <Article
                    key={cuid()}
                    article={article}
                  />
                ))
                : (
                  <Header
                    as="h3"
                    textAlign="center"
                    content="Articles matching you request have not been found!"
                    color="grey"
                  />
                )}
          </Item.Group>
        </InfiniteScroll>
      </div>
    </div>
  );
}

DiscoverPageView.propTypes = {
  articles: PropTypes.array.isRequired,
  parent: PropTypes.object.isRequired,
  hasMore: PropTypes.bool.isRequired,
  searchIsLoading: PropTypes.bool.isRequired
};

export default DiscoverPageView;
