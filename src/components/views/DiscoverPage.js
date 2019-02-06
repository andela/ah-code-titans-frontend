import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import {
  Item,
  Container,
  Loader,
  Header,
  Label,
  List,
  Button
} from "semantic-ui-react";
import cuid from "cuid";

import Article from "../containers/articles/article2";
import TagSection from "./TagSection";
import SearchInput from "../containers/searchInput";
import ArticlesFilter from "./ArticlesFilter";

const SearchClear = (props) => {
  const { active, resetQuery } = props;
  if (!active) return <div />;
  return (
    <Button
      inverted
      color="red"
      size="mini"
      onClick={() => {
        resetQuery();
      }}
    >
      clear
    </Button>
  );
};

SearchClear.propTypes = {
  active: PropTypes.bool.isRequired,
  resetQuery: PropTypes.func.isRequired
};

const SearchContent = (props) => {
  const { params, resetQuery } = props;

  const titleIsActive = params.title !== "" && params.title !== null;
  const authorIsActive = params.author !== "" && params.author !== null;
  const tagIsActive = params.tag !== "" && params.tag !== null;
  const tagsAreActive = params.tags.length;

  return (
    <div>
      {titleIsActive ? <Label horizontal>{params.title}</Label> : null}
      {authorIsActive ? <Label horizontal>{params.author}</Label> : null}
      {tagIsActive ? <Label horizontal>{params.tag}</Label> : null}
      {
        params.tags.map(item => (
          <Label horizontal key={cuid()}>{item}</Label>
        ))
      }
      <SearchClear
        active={titleIsActive || authorIsActive || tagIsActive || tagsAreActive}
        resetQuery={resetQuery}
      />
    </div>
  );
};

SearchContent.propTypes = {
  params: PropTypes.object.isRequired,
  resetQuery: PropTypes.func.isRequired
};

const SearchStatus = (props) => {
  const { parent } = props;
  const { params } = parent.state;

  return (
    <Container className="searchStatus">
      <div className="searchStatus__title">Search results for :</div>
      <List horizontal className="searchStatus__content">
        <SearchContent params={params} resetQuery={parent.resetQuery} />
      </List>
    </Container>
  );
};

SearchStatus.propTypes = {
  parent: PropTypes.object.isRequired
};

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
        <SearchStatus parent={parent} />
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
