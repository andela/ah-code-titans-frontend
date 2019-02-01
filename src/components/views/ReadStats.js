import React, { Component } from "react";
import {
  Dimmer, Loader, Statistic, Icon
} from "semantic-ui-react";
import PropTypes from "prop-types";

class ReadStats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isFetching, readArticleCount } = this.props;

    return (
      <div>
        <Dimmer active={isFetching} inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
        <Statistic size="tiny">
          <Statistic.Value>
            <Icon name="book" /> {readArticleCount}
          </Statistic.Value>
          <br />
          <Statistic.Label>Articles Read</Statistic.Label>
        </Statistic>
      </div>
    );
  }
}

ReadStats.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  readArticleCount: PropTypes.number.isRequired
};

export default ReadStats;
