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
      replyComment: ""
    };
    this.toggleReply = this.toggleReply.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
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
    }
    return true;
  };

  toggleReply() {
    const { comment, actions } = this.props;
    const { toggleReply } = this.state;
    this.setState({ toggleReply: !toggleReply });
    if (!toggleReply) {
      actions.getReplyComment({ slug, comment });
    }
  }

  render() {
    const { comment } = this.props;
    return <NewCommentView comment={comment} parent={this} {...this.state} />;
  }
}

const mapStateToProp = state => ({
  comments: state.commentReducer
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
