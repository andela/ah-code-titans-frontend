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
      comment: ""
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const { actions, articleSlug } = this.props;
    actions.comment.getComments(articleSlug, true);
  }

  onHandleChange = (event) => {
    this.setState({
      comment: event.target.value
    });
  };

  onSubmit = () => {
    const { actions, articleSlug } = this.props;
    const { comment } = this.state;
    actions.comment.createComment({ comment, articleSlug });
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
