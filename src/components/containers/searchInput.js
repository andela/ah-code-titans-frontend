import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchInputView from "../views/SearchInput";
import { history } from "../../store/configureStore";

class SearchInput extends Component {
  static propTypes = {
    initialValue: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    onKeyPress: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    alwaysActive: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    isLoading: PropTypes.bool
  }

  static defaultProps = {
    initialValue: "",
    onKeyPress: undefined,
    alwaysActive: false,
    isLoading: false
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue,
      type: "Article",
      // eslint-disable-next-line react/no-unused-state
      active: false
    };

    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onHandleChange(e) {
    this.setState({ value: e.target.value.substr(0, 80) });
  }

  onKeyPress(e) {
    if (e.key === "Enter") {
      const { type, value } = this.state;

      switch (type) {
        case "Article": {
          history.push(`/discover?title=${value}`);
          return;
        }
        case "Author": {
          history.push(`/discover?author=${value}`);
          return;
        }
        case "Tag": {
          history.push(`/discover?tag=${value}`);
          break;
        }
        default:
      }
    }
  }

  changeType(type) {
    this.setState({ type });
  }

  render() {
    return (
      <SearchInputView parent={this} />
    );
  }
}

export default SearchInput;
