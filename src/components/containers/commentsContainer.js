/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as ActionCreators from "../../actions/commentsActions";
import * as profileSearchActions from "../../actions/searchedProfileActions";

import CommentsView from "../views/articles/Comments";

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      enableCommentButton: true,
      updated: false
    };

    this.loadMore = this.loadMore.bind(this);
  }

  onHandleChange = (event) => {
    const { value } = event.target;
    this.setState({
      comment: value
    });
    if (value) {
      this.setState({
        enableCommentButton: false
      });
    } else {
      this.setState({
        enableCommentButton: true
      });
    }
  };

  onSubmit = () => {
    const { actions, articleSlug } = this.props;
    const { comment } = this.state;
    actions.comment.createComment({ comment, articleSlug });
    this.setState({
      comment: ""
    });
  };

  loadMore() {
    const { actions, articleSlug } = this.props;
    actions.comment.getComments(articleSlug);
  }

  handleCommentAuthorClick(e) {
    const { actions } = this.props;
    actions.author.fetchOtherProfile(e.target.innerHTML);
  }

  render() {
    const { comments, actions, articleSlug } = this.props;
    const { updated } = this.state;
    if (!updated) {
      actions.comment.getComments(articleSlug, true);
      this.setState({ updated: true });
      return <div />;
    }

    return <CommentsView parent={this} comments={comments} />;
  }
}
CommentsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  articleSlug: PropTypes.string.isRequired
};

const mapStateToProp = state => ({
  comments: state.comment
});

const mapDispatchToProp = dispatch => ({
  actions: {
    comment: bindActionCreators(ActionCreators, dispatch),
    author: bindActionCreators(profileSearchActions, dispatch)
  }
});

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(CommentsContainer);
