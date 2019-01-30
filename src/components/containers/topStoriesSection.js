import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import TopStoriesSectionView from "../views/TopStoriesSection";
import * as articleActions from "../../actions/articleActions";

class TopStoriesSection extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.article.getArticles("topStoriesSection", true);
  }

  render() {
    const { articles } = this.props;
    return (
      <TopStoriesSectionView articles={articles.slice(0, 9)} />
    );
  }
}

const mapStateToProps = state => ({
  articles: state.article.articles.topStoriesSection.results
});

const mapDispatchToProps = dispatch => ({
  actions: {
    article: bindActionCreators(articleActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopStoriesSection);
