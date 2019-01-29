
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchType: "",
      input: ""
    };
  }

  render() {
    return (
      <div>
        <Input icon="search" placeholder="Search..." value={this.state.input}/>
      </div>
    );
  }
}

class Discover extends Component {
  static propTypes = {
    prop: PropTypes
  }

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Container text>
        <div className="topBar">
          <div className="topbar__search">
            <SearchInput />
          </div>
        </div>
      </Container>
    );
  }
}

export default Discover;
