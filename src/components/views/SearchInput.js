import React from "react";
import { Input, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";

const SearchTypes = (props) => {
  const { parent } = props;
  const { type } = parent.state;

  return (
    <Dropdown
      text={type}
      icon="caret down"
      floating
      labeled
      button
      className="icon searchInput__type color primary"
    >
      <Dropdown.Menu>
        <Dropdown.Header
          icon="sticky note"
          content="Article"
          onClick={() => { parent.changeType("Article"); }}
        />
        <Dropdown.Header
          icon="write"
          content="Author"
          onClick={() => { parent.changeType("Author"); }}
        />
        <Dropdown.Header
          icon="tags"
          content="Tag"
          onClick={() => { parent.changeType("Tag"); }}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

SearchTypes.propTypes = {
  parent: PropTypes.object.isRequired
};

function SearchInputView(props) {
  const { parent } = props;
  const {
    onKeyPress, alwaysActive, size, isLoading
  } = parent.props;
  const { value, active } = parent.state;

  return (
    <div className={`searchInput${alwaysActive || active ? "--active" : ""}`}>
      <Input
        action={<SearchTypes parent={parent} />}
        actionPosition="left"
        icon="search"
        fluid
        loading={isLoading}
        size={size === undefined ? "small" : size}
        placeholder="Search ..."
        className="searciInput__input"
        value={value}
        onChange={parent.onHandleChange}
        onKeyPress={(e) => {
          if (onKeyPress === undefined) {
            // When on discover page, the articles instantly filter according to the input value
            parent.onKeyPress(e);
          } else {
            // When not on discover page, user is redirected to the page.
            onKeyPress(e, parent);
          }
        }}
      />
    </div>
  );
}

SearchInputView.propTypes = {
  parent: PropTypes.object.isRequired
};

export default SearchInputView;
