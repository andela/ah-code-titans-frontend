import React, { Component } from "react";
import {
  Dimmer, Loader, Statistic, Divider, Table
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ReadStats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isFetching, readArticleCount, createdArticles, createdArticleCount
    } = this.props;
    const titles = ["Article", "Likes", "Dislikes", "Average Rating"];
    const labels = [
      { title: "Read articles", data: readArticleCount },
      { title: "Written articles", data: createdArticleCount }
    ];
    return (
      <div>
        <Dimmer active={isFetching} inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
        <Statistic.Group size="tiny">
          {labels.map(label => (
            <Statistic>
              <Statistic.Value>{label.data}</Statistic.Value>
              <Statistic.Label>{label.title}</Statistic.Label>
            </Statistic>
          ))}
        </Statistic.Group>
        <Divider />
        <p>My articles</p>
        <Table striped>
          <Table.Header>
            <Table.Row>
              {titles.map(title => (
                <Table.HeaderCell>{title}</Table.HeaderCell>
              ))}
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
                  {article.rating === null ? "Not rated yet" : `${article.rating} star`}
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
  createdArticles: PropTypes.array.isRequired,
  createdArticleCount: PropTypes.number.isRequired
};

export default ReadStats;
