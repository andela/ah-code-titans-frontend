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
        <Item.Header as={Link} to={`/article/${article.slug}`}>{article.title}</Item.Header>
        <Item.Meta>
          <span className="right floated date">{`${createdTime} ago`}</span>
          <span className="ui black">{`${article.time_to_read} min read`}</span>
        </Item.Meta>
        <Item.Description>
          Created by <a as={Link} to="/p">{article.author.username}</a>
        </Item.Description>
        <Item.Description>
          {article.description}
        </Item.Description>
      </Item.Content>
      <Item.Image size="small" position="right" src="https://picsum.photos/1024/768/?random" rounded alt={article.title} />
    </Item>
  );
};

Article.propTypes = {
  article: PropTypes.object
};

Article.defaultProps = {
  article: {
    id: 1,
    slug: "mouth-letter-commercial-happen-allow",
    title: "Mouth letter commercial happen allow.",
    description: "['Set hundred entire process. Play author send member measure American.']",
    image: "https://picsum.photos/1024/768/?random",
    time_to_read: 0,
    createdAt: "2019-01-22T14:27:18.601955Z",
    updatedAt: "2019-01-22T14:27:18.601979Z"
  }
};

export default Article;
