import React from "react";
import PropTypes from "prop-types";
import cuid from "cuid";
import {
  Container, Header, Button, Image
} from "semantic-ui-react";

function ArticlesFilter(props) {
  const { parent } = props;
  const { filterOptions, params } = parent.state;
  return (
    <div className="aFilter">
      <Container>
        <Header as="h4">Tags</Header>
        <div className="aFilter__tags">
          {
            filterOptions.tags.map((item) => {
              const found = params.tags.find(tag => tag === item.value);

              return (
                <Button
                  active={found !== undefined}
                  inverted
                  primary
                  key={cuid()}
                  size="tiny"
                  className="secondaryButton"
                  onClick={() => {
                    parent.queryArticles(1, item);
                  }}
                >
                  {item.value}
                </Button>
              );
            })
          }
        </div>

        <Header as="h4">Authors</Header>
        <div className="aFilter__authors">
          {
            filterOptions.authors.map(author => (
              <Button
                active={author.value.username === params.author}
                inverted
                primary
                key={cuid()}
                size="tiny"
                onClick={() => {
                  parent.queryArticles(2, author);
                }}
              >
                <Image
                  avatar
                  src={author.value.image}
                  alt={author.value.username}
                />
                {author.value.username}
              </Button>
            ))
          }
        </div>
      </Container>
    </div>
  );
}

ArticlesFilter.propTypes = {
  parent: PropTypes.object.isRequired
};

export default ArticlesFilter;
