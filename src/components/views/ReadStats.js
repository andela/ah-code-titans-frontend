import React, { Component } from "react";
import {
  Dimmer, Loader, Statistic, Icon, Divider, Table
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ReadStats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isFetching, readArticleCount, createdArticles } = this.props;

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
          <Statistic.Label>Articles You have authored</Statistic.Label>
        </Statistic>
        <Divider />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Article</Table.HeaderCell>
              <Table.HeaderCell>Likes</Table.HeaderCell>
              <Table.HeaderCell>Dislikes</Table.HeaderCell>
              <Table.HeaderCell>Average Rating</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {createdArticles.map(article => (
              <Table.Row>
                <Table.Cell>
                  <Link to={`article/${article.slug}`}>{article.title}</Link>
                </Table.Cell>
                <Table.Cell>{article.likes}</Table.Cell>
                <Table.Cell>{article.dislikes}</Table.Cell>
                <Table.Cell>
                  {article.rating === null ? "Not rated yet" : `${article.rating} stars`}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <ul />
      </div>
    );
  }
}

ReadStats.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  readArticleCount: PropTypes.number.isRequired,
  createdArticles: PropTypes.array.isRequired
};

export default ReadStats;
