/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NewCommentView from "../views/articles/Comment";
import * as commentActions from "../../actions/commentsActions";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleReply: false,
      toggleReplyComment: false,
      replyComment: "",
      editCommentToggle: false
    };
    this.toggleReply = this.toggleReply.bind(this);
    this.toggleReplyComments = this.toggleReplyComments.bind(this);
  }

  componentDidMount() {
    const { comment, actions, articleSlug } = this.props;
    actions.getReplyComment({ slug: articleSlug, id: comment.id }, true);
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
  editComment = () => {
    const { comment, actions, articleSlug } = this.props;
    const { replyComment } = this.state;
    const { id, parent } = comment;

    actions.updateComment({
      slug: articleSlug,
      id,
      replyComment,
      parent
    });
    this.setState({
      replyComment: "",
      editCommentToggle: false
    });
  };

  // delete comment
  deleteComment = () => {
    const { comment, actions, articleSlug } = this.props;
    const { id, parent } = comment;
    actions.deleteComment({ slug: articleSlug, id, parent });
  };

  repliesComments = (props) => {
    const { comments, comment } = props;
    return comments.filter((singleComment, i) => {
      if (singleComment.parent === comment.id) {
        return singleComment;
      }
    });
  };

  toggleReply(props) {
    const { toggleReply } = this.state;
    this.setState({ toggleReply: !toggleReply, replyComment: "", editCommentToggle: false });
  }

  toggleReplyComments() {
    const { toggleReplyComment } = this.state;
    this.setState({ toggleReplyComment: !toggleReplyComment });
  }

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
