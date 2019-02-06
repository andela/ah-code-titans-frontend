import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as BookmarkActions from "../../../actions/bookmarkArticleActions";
import ArticleView from "../../views/articles/article2";

class Article extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      isBookmarked: props.article.bookmarked === undefined ? false : props.article.bookmarked
    };

    this.toggleBookmarkArticle = this.toggleBookmarkArticle.bind(this);
  }

  toggleBookmarkArticle() {
    const { actions, article } = this.props;
    const { isBookmarked } = this.state;

    // This function is called when the setting of the bookmark status has succeeded
    const onSuccess = () => {
      this.setState({ isBookmarked: !isBookmarked });
    };

    if (isBookmarked) {
      actions.bookmark.unBookmarkArticle(article.slug, onSuccess);
    } else {
      actions.bookmark.bookmarkArticle(article.slug, onSuccess);
    }
  }

  render() {
    return (<ArticleView {...this.props} parent={this} />);
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    bookmark: bindActionCreators(BookmarkActions, dispatch)
  }
});

export default connect(null, mapDispatchToProps)(Article);
