/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import cuid from "cuid";

function Tag(props) {
  const { tag, onNavTagClick, parent } = props;
  let isActive = false;
  const currentTag = tag.toLowerCase();

  if (parent !== undefined) {
    const tagFound = parent.state.params.tags.find(ptag => ptag === currentTag);
    isActive = tagFound !== undefined || tag === parent.state.params.tag;
  }

  return (
    onNavTagClick === undefined
      ? (
        <Link to={`/discover?tag=${currentTag}`}>
          <Menu.Item name={tag} />
        </Link>
      )
      : (
        <span
          role="button"
          onClick={onNavTagClick}
          className={`tagSection__tag${isActive ? "--active" : ""}`}
        >{tag}
        </span>
      )
  );
}

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  onNavTagClick: PropTypes.func,
  parent: PropTypes.object
};

Tag.defaultProps = {
  onNavTagClick: undefined,
  parent: undefined
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
