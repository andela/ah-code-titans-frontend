import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NewCommentView from "../views/articles/Comment";
import * as commentActions from "../../actions/commentsActions";

const slug = window.location.pathname.slice(9);
class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleReply: false,
      toggleReplyComment: false,
      replyComment: "",
      editCommentToggle: false,
      editReplyCommentToggle: false
    };
    this.toggleReply = this.toggleReply.bind(this);
    this.toggleReplyComments = this.toggleReplyComments.bind(this);
  }

  onHandleChange = (event) => {
    this.setState({
      replyComment: event.target.value
    });
  };

  onSubmit = (event) => {
    const { comment, actions, articleSlug } = this.props;
    const { replyComment } = this.state;
    const { id } = comment;
    actions.createReplyComment({ replyComment, slug: articleSlug, id });
    this.setState({
      replyComment: "",
      toggleReply: false
    });
  };

  // update comment section
  editComment = (event) => {
    const { comment, actions } = this.props;
    const { replyComment } = this.state;
    const { id } = comment;

    actions.updateComment({ slug, id, replyComment });
    this.setState({
      replyComment: ""
    });
  };

  // delete comment
  deleteComment = () => {
    const { comment, actions } = this.props;
    const { id } = comment;
    actions.deleteComment({ slug, id });
  };

  toggleReply() {
    const { toggleReply } = this.state;
    this.setState({ toggleReply: !toggleReply, replyComment: "", editCommentToggle: false });
  }

  toggleReplyComments() {
    const { comment, actions, articleSlug } = this.props;
    const { toggleReplyComment } = this.state;
    this.setState({ toggleReplyComment: !toggleReplyComment });
    if (!toggleReplyComment) {
      actions.getReplyComment({ slug: articleSlug, comment }, true);
    }
  }

  // update comment section
  toggleEditComments() {
    const { comment } = this.props;
    const { editCommentToggle } = this.state;
    this.setState({
      editCommentToggle: !editCommentToggle,
      replyComment: comment.text,
      toggleReply: false
    });
  }

  render() {
    const { comment, user } = this.props;
    return <NewCommentView user={user} comment={comment} parent={this} {...this.state} />;
  }
}

const mapStateToProp = state => ({
  comments: state.comment,
  user: state.loginReducer.auth
});

const mapDispatchToProp = dispatch => ({
  actions: bindActionCreators(commentActions, dispatch)
});

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  articleSlug: PropTypes.string.isRequired
};

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(Comment);
