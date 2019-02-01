import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Item } from "semantic-ui-react";

import { humanizeTime, humanizeTimeToRead } from "../../../helpers/time";

const Article = (props) => {
  const { article } = props;
  if (article.createdAt === undefined) return <div />;
  return (
    <Link to={`/article/${article.slug}`}>
      <Item className="article--1">
        <Item.Image src={article.image} alt={article.title} />
        <div className="article__fade" />
        <Item.Content>
          <Item.Header as="h1">{article.title}</Item.Header>
          <Item.Meta>
            <span className="right floated date">{humanizeTime(article.createdAt)}</span>
            <span className="ui black">{humanizeTimeToRead(article.time_to_read)}</span>
          </Item.Meta>
          <Item.Description>
            {article.description}
          </Item.Description>
        </Item.Content>
      </Item>
    </Link>
  );
};

Article.propTypes = {
  article: PropTypes.object
};

Article.defaultProps = {
  article: {
    id: 1,
    slug: "",
    title: "",
    description: "",
    image: "https://picsum.photos/1024/768/?random",
    time_to_read: 0,
    createdAt: "",
    updatedAt: ""
  }
};

export default Article;
