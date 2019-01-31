import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import cuid from "cuid";

function Tag(props) {
  const { tag, onNavTagClick } = props;
  return (
    onNavTagClick === undefined
      ? (
        <Link to={`/discover?tag=${tag.toLowerCase()}`}>
          <Menu.Item name={tag} />
        </Link>
      )
      : <Menu.Item name={tag} onClick={onNavTagClick} />
  );
}

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  onNavTagClick: PropTypes.func
};

Tag.defaultProps = {
  onNavTagClick: undefined
};

function TagSection(props) {
  const tags = [
    "CULTURE",
    "MUSIC",
    "TRAVEL",
    "TECH",
    "ART",
    "STARTUPS",
    "SELF",
    "POLITICS",
    "DESIGN",
    "HEALTH",
    "SCIENCE",
    "CREATIVITY",
    "MOTIVATION",
    "ANIMALS",
    "TOURISM",
    "ENTERTAINMENT",
    "BUSINESS",
    "SPORTS",
    "FOOD"
  ];

  return (
    <Menu secondary>
      {tags.map(tag => <Tag {...props} key={cuid()} tag={tag} />)}
    </Menu>
  );
}

export default TagSection;
