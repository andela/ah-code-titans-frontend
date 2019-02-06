import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import RecentStoriesSectionView from "../views/RecentStoriesSection";
import * as articleActions from "../../actions/articleActions";

class RecentStoriesSection extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    // Load fresh set of articles
    actions.article.getArticles("recentStoriesSection", true);
  }

  loadMore() {
    const { actions } = this.props;
    // Continue fetching more articles using the current article query params
    actions.article.getArticles("recentStoriesSection");
  }

  render() {
    const { articles } = this.props;
    return (
      <RecentStoriesSectionView
        articles={articles.results}
        hasMore={articles.more}
        parent={this}
      />
    );
  }
}

const mapStateToProps = state => ({
  articles: state.article.articles.recentStoriesSection
});

const mapDispatchToProps = dispatch => ({
  actions: {
    article: bindActionCreators(articleActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentStoriesSection);
