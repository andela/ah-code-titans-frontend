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
        {
            filterOptions.tags.map(item => (
              <Button
                active={item.value === params.tag}
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
            ))
        }

        <Header as="h4">Authors</Header>
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
      </Container>
    </div>
  );
}

ArticlesFilter.propTypes = {
  parent: PropTypes.object.isRequired
};

export default ArticlesFilter;
