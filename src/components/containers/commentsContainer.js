/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as ActionCreators from "../../actions/commentsActions";
import CommentsView from "../views/articles/Comments";

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      enableCommentButton: true
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const { actions, articleSlug } = this.props;
    actions.comment.getComments(articleSlug, true);
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

  render() {
    const { comments } = this.props;
    return <CommentsView parent={this} comments={comments} />;
  }
}
CommentsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  articleSlug: PropTypes.string.isRequired
};

const mapStateToProp = state => ({
  comments: state.commentReducers
});

const mapDispatchToProp = dispatch => ({
  actions: {
    comment: bindActionCreators(ActionCreators, dispatch)
  }
});

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(CommentsContainer);
