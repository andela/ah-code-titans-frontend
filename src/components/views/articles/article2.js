/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Item, List
} from "semantic-ui-react";
import { humanizeTime, humanizeTimeToRead } from "../../../helpers/time";

const Article = (props) => {
  const { article, parent } = props;

  // Check if article data exist
  if (article.createdAt === undefined) return <div />;

  return (
    <Item className="article--2">

      <Item.Content>
        <Link to={`/article/${article.slug}`}>
          <Item.Header as="h3">{article.title}</Item.Header>
        </Link>
        <Item.Meta>
          <span className="right floated date">{humanizeTime(article.createdAt)}</span>
          <span className="ui black">{humanizeTimeToRead(article.time_to_read)}</span>
        </Item.Meta>
        <Item.Description>
          {article.description}
        </Item.Description>
        <Item.Extra>
          <List horizontal floated="right">
            <List.Item>
              <div
                role="button"
                onClick={parent.toggleBookmarkArticle}
              >
                <i className={`bookmark icon ${parent.state.isBookmarked ? "yellow" : "grey outline"}`} />
              </div>
            </List.Item>
            <List.Item>
              <div>Rating: 0</div>
            </List.Item>
          </List>

        </Item.Extra>
      </Item.Content>
      <Link to={`/article/${article.slug}`}>
        <Item.Image size="small" position="right" src={article.image} rounded alt={article.title} />
      </Link>
    </Item>
  );
};

Article.propTypes = {
  article: PropTypes.object,
  parent: PropTypes.object.isRequired
};

Article.defaultProps = {
  article: {
    id: 1,
    slug: "",
    title: "",
    description: "",
    image: "",
    time_to_read: 0,
    createdAt: "",
    updatedAt: ""
  }
};

export default Article;
