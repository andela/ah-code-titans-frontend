import React from "react";
import PropTypes from "prop-types";
import cuid from "cuid";
import { Menu } from "semantic-ui-react";

function Tag(props) {
  const { tag, onNavTagClick } = props;
  return (
    <Menu.Item as="a" onClick={onNavTagClick} name={tag} />
  );
}

Tag.propTypes = {
  tag: PropTypes.string.isRequired
};

function TagSection(props) {
  const tags = [
    "CULTURE",
    "MUSIC",
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
      {tags.map(tag => <Tag onNavTagClick={onNavTagClick} key={cuid()} tag={tag} />)}
    </Menu>
  );
}

TagSection.propTypes = {
  onNavTagClick: PropTypes.func.isRequired
};

export default TagSection;
