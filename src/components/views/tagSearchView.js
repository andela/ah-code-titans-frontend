/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  Segment, Item, Label, List
} from "semantic-ui-react";
import cuid from "cuid";
import PropTypes from "prop-types";

const TagSearchView = (props) => {
  const { article, tags } = props;
  return (
    <div className="container">
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header as="a">{article.title}</Item.Header>
                <Item.Description>
                    Created by <a href="#">{article.author.username}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {tags.map(tag => (
              <List.Item key={cuid()}>
                <Label tag>
                  {tag}
                </Label>
              </List.Item>
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{article.description}</span>
        </Segment>
      </Segment.Group>
    </div>
  );
};

TagSearchView.propTypes = {
  article: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired
};

export default TagSearchView;
