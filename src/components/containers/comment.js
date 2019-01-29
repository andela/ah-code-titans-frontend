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
      replyComment: ""
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
    const { comment, actions } = this.props;
    const { replyComment } = this.state;
    const { id } = comment;

    if (event.which === 13 || event.keyCode === 13) {
      actions.createReplyComment({ replyComment, slug, id });
      this.setState({
        replyComment: ""
      });
    }
    return true;
  };

  toggleReply() {
    const { toggleReply } = this.state;
    this.setState({ toggleReply: !toggleReply });
  }

  toggleReplyComments() {
    const { comment, actions } = this.props;
    const { toggleReplyComment } = this.state;
    this.setState({ toggleReplyComment: !toggleReplyComment });
    if (!toggleReplyComment) {
      actions.getReplyComment({ slug, comment }, true);
    }
  }

  render() {
    const { comment } = this.props;
    return <NewCommentView comment={comment} parent={this} {...this.state} />;
  }
}

const mapStateToProp = state => ({
  comments: state.comment
});

const mapDispatchToProp = dispatch => ({
  actions: bindActionCreators(commentActions, dispatch)
});

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(Comment);
