import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import { Item } from "semantic-ui-react";

const Article = (props) => {
  const { article } = props;
  if (article.createdAt === undefined) return <div />;

  const time = moment(article.createdAt, "YYYY-MM-DD HH:mm:ss").utc(3).local();
  const createdTime = moment.duration(time.diff(moment()), "milliseconds").humanize();

  return (
    <Item className="article--2">

      <Item.Content>
        <Link to={`/article/${article.slug}`}>
          <Item.Header as="h3">{article.title}</Item.Header>
        </Link>
        <Item.Meta>
          <span className="right floated date">{`${createdTime} ago`}</span>
          <span className="ui black">{`${article.time_to_read} min read`}</span>
        </Item.Meta>
        <Item.Description>
          {article.description}
        </Item.Description>
      </Item.Content>
      <Link to={`/article/${article.slug}`}>
        <Item.Image size="small" position="right" src={article.image} rounded alt={article.title} />
      </Link>
    </Item>
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
    image: "",
    time_to_read: 0,
    createdAt: "",
    updatedAt: ""
  }
};

export default Article;
